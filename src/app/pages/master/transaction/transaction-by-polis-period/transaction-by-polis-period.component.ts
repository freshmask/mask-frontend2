import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../transaction.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-transaction-by-polis-period',
  templateUrl: './transaction-by-polis-period.component.html',
  styleUrls: ['./transaction-by-polis-period.component.css']
})
export class TransactionByPolisPeriodComponent implements OnInit {

  date1: Date;
  date2: Date;

  newDate1: number;
  newDate2: Date;

  transactions: any[];
  newTransactions: any[];
  fileName = 'Transaction-by-polis-period-' + new Date().toDateString() + '.xlsx';

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getPolisActive();
  }

  // tslint:disable-next-line:typedef
  getPolisActive(){
    this.transactionService.getPolisByStatus()
      .subscribe(data => {
        this.newTransactions = data;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  getPolisPeriode(date1, date2){
    // const isoDate1 = new Date(date1).toLocaleString();
    // const isoDate2 = new Date(date2).toLocaleString();
    console.log(date1, date2);
    this.transactionService.getPolisPeriod2(date1, date2)
      .subscribe(data => {
        this.newTransactions = data;
      }, error => {
        alert(error);
      });
  }

  // getMonth(month){
  //   this.transactionService.getPolisPeriod(month)
  //     .subscribe(data => {
  //       this.transactions = data;
  //     }, error => {
  //       alert(error);
  //     });
  // }

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
