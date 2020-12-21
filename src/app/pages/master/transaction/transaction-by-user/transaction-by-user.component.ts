import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {TransactionService} from '../transaction.service';
import {Transaction} from '../transaction-model/Transaction.model';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-transaction-by-user',
  templateUrl: './transaction-by-user.component.html',
  styleUrls: ['./transaction-by-user.component.css']
})
export class TransactionByUserComponent implements OnInit {
  isSearch = false;
  searchByName = '';
  transactionUser: Transaction[] = [];
  newData;
  loadedPosts: any[];
  isStatusPolis = false;
  transList = [];
  userId = localStorage.getItem('UserId');
  fileName = 'Transaction-by-user-' + new Date().toDateString() + '.xlsx';

  constructor(private authService: AuthService, private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.onGetTransactionByUserId();
  }

  // tslint:disable-next-line:typedef
  onGetTransactionByUserId() {
    this.transactionService.getTransactionByUser(this.userId).subscribe(data => {
        this.transactionUser = data;
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

  // shortIsClaim() {
  //   if ( this.isStatusPolis === false ){
  //     this.isStatusPolis = true;
  //   }else{
  //     this.isStatusPolis = false;
  //   }
  //   this.transactionService.getTransactionByPolisInActive()
  //     .subscribe(data => {
  //       this.transList = data;
  //     }, error => {
  //       alert(error);
  //     });
  //
  // }

  // tslint:disable-next-line:typedef
  downloadSwafotoPA(fileNamePhoto: File, name: string) {
    this.transactionService.getSwafotoPA(fileNamePhoto, name).subscribe((response) => {
      Swal.fire('Success',
        'Foto Customer berhasil di Download',
        'success');
    }, error => {
      alert(error);
    });

  }


  // tslint:disable-next-line:typedef
  downloadDocPAR(documentName: string, name: string) {
    this.transactionService.getDocumentPAR(documentName, name).subscribe((response) => {
      Swal.fire('Success',
        'Dokumen Customer berhasil di Download',
        'success');
    }, error => {
      alert(error);
    });
  }

  // tslint:disable-next-line:typedef
  downloadSwafotoTravel(fileNamePhoto: string, name: string) {
    this.transactionService.getSwafotoTravel(fileNamePhoto, name).subscribe((response) => {
      Swal.fire('Success',
        'Foto Customer berhasil di Download',
        'success');
    }, error => {
      alert(error);
    });

  }

  // tslint:disable-next-line:typedef
  downloadFotoktpPA(fileNameIdentity: File, heirName: string) {
    this.transactionService.getFotoktpPA(fileNameIdentity, heirName).subscribe((response) => {
      Swal.fire('Success',
        'Foto Ktp Customer berhasil di Download',
        'success');
    }, error => {
      alert(error);
    });

  }

  // tslint:disable-next-line:typedef
  downloadFotoktpTravel(fileNameIdentity: string, name: string) {
    this.transactionService.getFotoktpTravel(fileNameIdentity, name).subscribe((response) => {
      Swal.fire('Success',
        'Foto Ktp Customer berhasil di Download',
        'success');
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
