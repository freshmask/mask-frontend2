import { Component, OnInit } from '@angular/core';
import {User} from '../../user/user.model';
import {UserService} from '../../user/user.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  User: User;
  page = 1;
  size = 3;
  totalItems = 2;
  isSearch = false;
  searchByName = '';
  userList: any[];
  newData;
  loadedPosts: any[];
  fileName = 'list-admin-' + new Date().toDateString() + '.xlsx';
  isLoading = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.onGetUser();
  }
  onGetUser() {
    this.isLoading = true;
    this.userService.getUserByRole(this.page, this.size)
      .subscribe(data => {
        this.isLoading = false;
        this.loadedPosts = data.content;
        this.totalItems = data.totalElements;
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
            this.searchLive();
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
    this.userService.getUserByRole(this.page, this.size)
      .subscribe(data => {
        this.newData = data.content;
        this.totalItems = data.totalElements;
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

  exportexcel() {

    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    Swal.fire('Success',
      'Berhasil mengunduh file excel',
      'success');
}
}
