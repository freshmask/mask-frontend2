import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-change-password',
  templateUrl: './form-change-password.component.html',
  styleUrls: ['./form-change-password.component.css']
})
export class FormChangePasswordComponent implements OnInit {
  changeForm: FormGroup;
  isErrorValidation: boolean = false;
  errorPassword: string;
  passwordFirst: string;
  passwordSecond: string;
  passwordOld: string;
  id;
  token: any;
  x: any;
  changePassword;
  isLoading = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void{
    this.changeForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      newpassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
      confirm: new FormControl(null, [Validators.required])
    });
  }

  // tslint:disable-next-line:typedef
  submit(value) {
    this.changePassword = {
      name: null,
      idCardNo: null,
      email: null,
      password: value.newpassword,
      birtdate: null,
      gender: null,
      phoneNumber: null,
      fingerData: null,
      isActive: null,
      role: null
    };

    this.token = window.sessionStorage.getItem('token');
    this.x = JSON.parse(this.token);
    this.id = this.x.user.id;
    this.isLoading = true;
    this.userService.createNewPassword(this.changePassword , this.id, value.password ).subscribe(response => {
      this.isLoading = false;
      Swal.fire('Success',
          'Berhasil merubah password',
          'success');
      }, error => {
        Swal.fire(
          'Gagal',
          'Kata sandi lama tidak sesuai',
          'error'
        );
    });
  }
  form(property): AbstractControl {
    return this.changeForm.get(property);
  }
  passwordMatch() {
    if (this.passwordSecond !== this.passwordFirst) {
      this.errorPassword = 'Kata sandi tidak sama';
      this.isErrorValidation = true;
    } else {
      this.isErrorValidation = false;
    }
  }
}
