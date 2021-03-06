import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user.model';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import Swal from 'sweetalert2';
import {UserService} from '../../user/user.service';
import {environment as env} from '../../../../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  token: any;
  x: any;
  valueEmail: string;
  forgetPassword;
  isLoading = false;


  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  form(property): AbstractControl {
    return this.loginForm.get(property);
  }

  private buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl(null, [Validators.required])
    });
  }


  // tslint:disable-next-line:typedef
  login(value) {
    const body = new HttpParams()
      .set('username', value.email)
      .set('password', value.password)
      .set('grant_type', 'password');
    this.authService.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      this.token = window.sessionStorage.getItem('token');
      this.x = JSON.parse(this.token);
      if(this.x.user.isActive === 'true'){
        if(this.x.user.role === '01' || this.x.user.role === '02' || this.x.user.role === '04'){
          Swal.fire('Success', 'Berhasil Login', 'success' );
          this.router.navigate(['/admin/user']);
        } else {
          Swal.fire('Gagal', 'Anda tidak memiliki akses untuk halaman ini', 'error' );
          this.router.navigate(['/']);
        }
      } else {
        Swal.fire('Gagal', 'Akun anda tidak aktif, silahkan menunggu aktivasi', 'error' );
        this.router.navigate(['/admin']);
      }
    }, (error) => {
      Swal.fire('Gagal', 'Email atau kata sandi tidak benar', 'error' );
    });
  }

  onSendEmail(valueEmail: string) {
    this.isLoading = true;
    this.userService.forgetPassword(valueEmail).subscribe(response => {
      this.isLoading = false;
      Swal.fire('Sukses',
        'Kata sandi baru akan dikirim melalui email',
        'success');
    }, error => {
      Swal.fire(
        'Gagal',
        'error',
        'error'
      );
    });
    this.router.navigate(['/admin']);

  }
}


