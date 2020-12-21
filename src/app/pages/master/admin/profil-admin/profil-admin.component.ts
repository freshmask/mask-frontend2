import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../auth/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit {

  token: any;
  x: any;
  name;
  email;
  idCardNo;
  password;
  birthdate;
  gender;
  phoneNumber;
  id;
  loadedUser: User[] = [];

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.getDetail();
  }
  getDetail(){
    this.token = window.sessionStorage.getItem('token');
    this.x = JSON.parse(this.token);
    this.id = this.x.user.id;
    this.name = this.x.user.name;
    this.email = this.x.user.email;
    this.idCardNo = this.x.user.idCardNo;
    this.password = this.x.user.password;
    this.birthdate = this.x.user.birthdate;
    this.gender = this.x.user.gender;
    this.phoneNumber = this.x.user.phoneNumber;
    // this.userService.getUserById(this.x.user.id).subscribe(data => {
    //           this.loadedUser = data;
    //         }, error => {
    //           alert(error);
    //         });
  }

  OnChangePassword() {
    this.route.navigateByUrl('/admin/dashboard/change/' + this.id, {state: this.id});
  }
}
