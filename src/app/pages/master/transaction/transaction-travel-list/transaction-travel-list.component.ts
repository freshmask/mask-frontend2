import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {TransactionService} from '../transaction.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-transaction-travel-list',
  templateUrl: './transaction-travel-list.component.html',
  styleUrls: ['./transaction-travel-list.component.css']
})
export class TransactionTravelListComponent implements OnInit {
  page = 1;
  size = 10;
  totalItems;
  isSearch = false;
  searchByName = '';
  transactionList = [];
  newData;
  loadedPosts: any[];
  fileName = 'Transaction-by-travel-' + new Date().toDateString() + '.xlsx';
  isLoading = false;

  constructor(private authService: AuthService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.onGetTransactionTA();
  }
  // tslint:disable-next-line:typedef
  onGetTransactionTA() {
    this.isLoading = true;
    this.transactionService.getTransactionTA(this.page, this.size)
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
    this.onGetTransactionTA();
  }

  // tslint:disable-next-line:typedef
  searchLive() {
    if (this.searchByName === '') {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
    this.transactionService.getAllTransactionTAList()
      .subscribe((response: any) => {
        this.newData = JSON.stringify(response);
        if (this.transactionList !== []) {
          this.transactionList = [];
        }
        for (const acc of JSON.parse(this.newData)) {
          if (acc.id.toLowerCase().indexOf(this.searchByName.toLowerCase()) > -1) {
            this.transactionList.push(acc);
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

  // tslint:disable-next-line:typedef
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
