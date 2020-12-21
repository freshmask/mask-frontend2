import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {TransactionService} from '../transaction.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-transaction-pa-list',
  templateUrl: './transaction-pa-list.component.html',
  styleUrls: ['./transaction-pa-list.component.css']
})
export class TransactionPaListComponent implements OnInit {
  page = 1;
  size = 10;
  totalItems;
  isSearch = false;
  searchByName = '';
  transactionList = [];
  newData;
  loadedPosts: any[];
  fileName = 'Transaction-by-pa-' + new Date().toDateString() + '.xlsx';
  isLoading = false;

  constructor(private authService: AuthService, private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.onGetTransactionPA();
  }

  // tslint:disable-next-line:typedef
  onGetTransactionPA() {
    this.isLoading = true;
    this.transactionService.getTransactionPA(this.page, this.size)
      .subscribe(data => {
        this.isLoading = false;
        this.loadedPosts = data.content;
        this.totalItems = data.totalElements;
      }, error => {
        Swal.fire('Gagal',
          'Error',
          'error');
  });
  }

  // tslint:disable-next-line:typedef
  onPageChange(event) {
    this.page = event;
    this.onGetTransactionPA();
  }

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
  searchLive() {
    if (this.searchByName === '') {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
    this.transactionService.getAllTransactionPAList()
      .subscribe((response: any) => {
        this.newData = JSON.stringify(response);
        if (this.transactionList !== []) {
          this.transactionList = [];
        }
        for (const acc of JSON.parse(this.newData)) {
          if (acc.trxpaId.toLowerCase().indexOf(this.searchByName.toLowerCase()) > -1) {
            this.transactionList.push(acc);
          }
        }
      }, error => {
        Swal.fire('Gagal',
          'Error',
          'error');
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
