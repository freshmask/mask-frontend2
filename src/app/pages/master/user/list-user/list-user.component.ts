import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {AuthService} from '../../auth/auth.service';
import {TransactionService} from '../../transaction/transaction.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  User: User;
  page = 1;
  size = 5;
  totalItems = 2;
  isSearch = false;
  searchByName = '';
  userList = [];
  newData;
  loadedPosts: any[];
  transactionUser = [];
  fileName = 'list-user-' + new Date().toDateString() + '.xlsx';
  isLoading = false;


  constructor(private userService: UserService, private authService: AuthService,
              private transactionService: TransactionService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetUser();
  }

  // tslint:disable-next-line:typedef
  onGetUser() {
    this.isLoading = true;
    this.userService.getUser(this.page, this.size)
      .subscribe(data => {
        this.loadedPosts = data.content;
        this.totalItems = data.totalElements;
        this.isLoading = false;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onPageChange(event){
    this.page = event;
    this.onGetUser();
  }

  // tslint:disable-next-line:typedef
  onStatusChange(id) {
    Swal.fire({
      title: 'Apakah benar?',
      text: 'Anda ingin merubah status aktivasi',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'tidak',
      confirmButtonText: 'Ya, Ubah Status!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.changeStatus(id)
          .subscribe(data => {
            this.onGetUser();
          });
        Swal.fire(
          'Berhasil!',
          'Anda sudah merubah status',
          'success'
        );
      }
    });
  }

  // tslint:disable-next-line:typedef
  searchLive() {
    if (this.searchByName === ''){
      this.isSearch = false;
    }else{
      this.isSearch = true;
    }
    this.userService.getAllUserList()
      .subscribe((response: User[]) => {
        this.newData = response;
        if (this.userList !== []) {
          this.userList = [];
        }
        for (const acc of this.newData) {
           if (acc.name.toLowerCase().indexOf(this.searchByName.toLowerCase()) > -1) {
            this.userList.push({
              id: acc.id,
              name: acc.name,
              email: acc.email,
              idCardNo: acc.idCardNo,
              password: acc.password,
              birthdate: acc.birthdate,
              gender: acc.gender,
              role: acc.role,
              isActive: acc.isActive,
              phoneNumber: acc.phoneNumber
            });
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
  getDetailUserTrans(id) {
    localStorage.setItem('UserId', id);
    this.router.navigateByUrl('/admin/transaction/byUser/' + id, {state: id});
  }

  sendRenewalNotif() {
    this.userService.sendRenewalNotification()
      .subscribe(response => {
        Swal.fire('Sukses', 'Berhasil mengirim notifikasi renewal ke email customer', 'success' );
      }, error => {

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
