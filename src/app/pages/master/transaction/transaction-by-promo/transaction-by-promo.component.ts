import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {TransactionService} from '../transaction.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-transaction-by-promo',
  templateUrl: './transaction-by-promo.component.html',
  styleUrls: ['./transaction-by-promo.component.css']
})
export class TransactionByPromoComponent implements OnInit {

  isSearch = false;
  searchByName = '';
  transactionList = [];
  newData;
  loadedPosts: any[];
  isStatusPromo = false;
  transList = [];
  fileName = 'Transaction-by-promo-' + new Date().toDateString() + '.xlsx';
  isLoading = false;

  constructor(private authService: AuthService, private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.onGetTransactionByPolis();
  }

  // tslint:disable-next-line:typedef
  onGetTransactionByPolis() {
    this.isLoading = true;
    this.transactionService.getTransactionByPromo()
      .subscribe(data => {
        this.loadedPosts = data;
        this.isLoading = false;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onLogout() {
    this.authService.logout();
  }

  shortIsPromo() {
    if ( this.isStatusPromo === false ){
      this.isStatusPromo = true;
    }else{
      this.isStatusPromo = false;
    }
    this.transactionService.getTransactionByPromoInActive()
      .subscribe(data => {
        this.transList = data;
      }, error => {
        Swal.fire('Gagal',
          'Error',
          'error');

      });

  }

  exportexcel() {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);


  }
}
