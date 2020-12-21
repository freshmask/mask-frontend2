import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {TransactionService} from '../transaction.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent implements OnInit {

  page = 1;
  size = 5;
  totalItems;
  isSearch = false;
  searchByName = '';
  transactionList: any[];
  newData;
  loadedPosts: any[];
  fileName = 'list-semua-transaksi-' + new Date().toDateString() + '.xlsx';
  isLoading = false;

  constructor(private authService: AuthService, private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.onGetTransaction();
  }

  // tslint:disable-next-line:typedef
  onGetTransaction() {
    this.isLoading = true;
    this.transactionService.getAllTransaction(this.page, this.size)
      .subscribe(data => {
        this.loadedPosts = data.content;
        this.totalItems = data.totalElements;
        this.isLoading = false;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onPageChange(event) {
    this.page = event;
    this.onGetTransaction();
  }

  // tslint:disable-next-line:typedef
  searchLive() {
    if (this.searchByName === '') {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
    this.transactionService.getAllTransaction(this.page, this.size)
      .subscribe((response) => {
        this.newData = JSON.stringify(response.content);
        this.totalItems = response.totalElements;
        if (this.transactionList !== []) {
          this.transactionList = [];
        }
        for (const acc of JSON.parse(this.newData)) {
          if (acc.transactionPA !== null){
            if (acc.transactionPA.trxpaId.toLowerCase().indexOf(this.searchByName.toLowerCase()) > -1) {
              this.transactionList.push(acc);
            }
          }else if (acc.transactionPAR !== null){
            if (acc.transactionPAR.trxparId.toLowerCase().indexOf(this.searchByName.toLowerCase()) > -1) {
              this.transactionList.push(acc);
            }
          }else if (acc.transactionTravel !== null){
            if (acc.transactionTravel.id.toLowerCase().indexOf(this.searchByName.toLowerCase()) > -1) {
              this.transactionList.push(acc);
            }
          }
        }
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onLogout() {
    this.authService.logout();
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
