import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {TransactionService} from '../transaction.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-transaction-by-polis',
  templateUrl: './transaction-by-polis.component.html',
  styleUrls: ['./transaction-by-polis.component.css']
})
export class TransactionByPolisComponent implements OnInit {
  isSearch = false;
  searchByName = '';
  transactionList = [];
  newData;
  loadedPosts: any[];
  isStatusPolis = false;
  transList = [];
  fileName = 'Transaction-by-polis-' + new Date().toDateString() + '.xlsx';
  status = 'tidak aktif';

  constructor(private authService: AuthService, private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.onGetTransactionByPolis();
  }

  // tslint:disable-next-line:typedef
  onGetTransactionByPolis() {
    this.transactionService.getTransactionByPolis()
      .subscribe(data => {
        this.loadedPosts = data;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef

  // tslint:disable-next-line:typedef
  // onStatusChange(id) {
  //   this.transactionService.changeStatus(id)
  //     .subscribe(data => {
  //       console.log(data);
  //       this.onGetTransactionPA();
  //     });
  //
  // }


  // tslint:disable-next-line:typedef
  onLogout() {
    this.authService.logout();
  }

  // tslint:disable-next-line:typedef
  shortIsClaim() {
    if ( this.isStatusPolis === false ){
      this.isStatusPolis = true;
    }else{
      this.isStatusPolis = false;
    }
    this.transactionService.getTransactionByPolisInActive(this.status)
      .subscribe(data => {
        this.transList = data;
      }, error => {
        alert(error);
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
