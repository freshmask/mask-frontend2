import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {User} from './register/user.model';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {environment as env} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  login(value) {
    const loginValue = 'maskapp' + ':' + 'maskapp-secret-key';
    // const header = {
    //   headers: new HttpHeaders().set('Authorization', `Basic ${btoa(loginValue)}`)
    // };
    const headers = {
      'Authorization': 'Basic ' + btoa(loginValue),
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(`api/oauth/token`, value, {headers});

  }

  showData(): Observable<any> {

    return new Observable((observer: Observer<any>) => {
      this.http.get('api/users?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: any) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  createUser(loadsUser: User): Observable<User> {
    return new Observable((observer: Observer<User>) => {
      this.http.post('/api/signup', loadsUser)
        .subscribe((response: User) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });
  }

  getRoleByUsername(data) {
    const tempData = data.email + ':' + data.password;
    const header = {
      headers: new HttpHeaders().set('Authorization', `Basic ${btoa(tempData)}`)
    };
    return this.http.get('/api/getUserByRole', header);
  }


  // tslint:disable-next-line:typedef
  logout() {
    Swal.fire({
      text: 'Anda Yakin Ingin Keluar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then((result) => {
      if (result.value) {
        window.sessionStorage.clear();
        localStorage.clear();
        // window.sessionStorage.removeItem('token');
        this.router.navigate(['/admin'])
          .then(() => {
            window.location.reload();
          });
        Swal.fire({
          title: 'Anda berhasil keluar',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        }).then(
          // tslint:disable-next-line:only-arrow-functions
          function() {
          },
          // tslint:disable-next-line:only-arrow-functions
          function(dismiss) {
            if (dismiss === 'timer') {
            }
          });
      }
    });
  }
}
