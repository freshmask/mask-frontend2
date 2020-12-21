import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ApiResponsPage, User} from './user.model';
import {PackagePAModel} from '../../home/model/packagePA.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  login(value) {
    const loginValue = 'maskapp' + ':' + 'maskapp-secret-key';

    const headers = {
      'Authorization': 'Basic ' + btoa(loginValue),
      'Content-type': 'application/x-www-form-urlencoded'
    };
    console.log('ini login nya sudah true');

    return this.http.post('api/oauth/token', value, {headers});
  }

  getUser(page, pageSize): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/getUserByRole/03?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .pipe(map((responseData: any) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements
          };
          return temp;
        }))
        .subscribe((data: ApiResponsPage) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  changeStatus(id): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.put(`api/user/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, id)
        .subscribe((data: any) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getAllUserList(): Observable<User[]> {
    return new Observable((observer: Observer<User[]>) => {
      this.http.get('api/user/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: User[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getUserByRole(page: number, size: number): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/getUserByRole/02?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .pipe(map((responseData: any) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements
          };
          return temp;
        }))
        .subscribe((data: ApiResponsPage) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getAllUserListByRole(): Observable<User[]> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/getUserByRole/02?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .pipe(map((responseData: any) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements
          };
          return temp;
        }))
        .subscribe((data: ApiResponsPage) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getUserById(id): Observable<User[]> {
    return new Observable((observer: Observer<User[]>) => {
      this.http.get(`api/user/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: User[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  createNewPassword(value, id, currentPassword): Observable<User[]> {
    return new Observable((observer: Observer<User[]>) => {
      this.http.post(`api/changePassword/${id}?currentPassword=${currentPassword}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, value)
        .subscribe((response: User[]) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });

  }

  forgetPassword(value): Observable<User[]> {
    return new Observable((observer: Observer<User[]>) => {
      this.http.post(`api/forgotPassword?email=${value}`, value)
        .subscribe((response: User[]) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });

  }

  sendRenewalNotification(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.post('api/sendNotifiedRenewal?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, null)
        .subscribe((data: any) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }
}
