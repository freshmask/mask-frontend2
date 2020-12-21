import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {ApiResponsPage, User} from '../user/user.model';
import {Transaction} from '../transaction/transaction-model/Transaction.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient){}

  getAllTransaction(): Observable<Transaction[]>  {
    return new Observable((observer: Observer<Transaction[]>) => {
      this.http.get('api/transaction/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: Transaction[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getAllTransactionPAList(): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get('api/transactionsPA/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: User[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getAllTransactionTravelList(): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get('api/transactiontravel/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getAllTransactionPARList(): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get('api/transactionPAR/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getAllUsers(): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get('api/user/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getClaimPA(): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get('api/claimPA/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getClaimPAR(): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get('api/claimPAR/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getClaimTravel(): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get('api/claimtravel/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getUserByRole(page: number, size: number, role: string): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/getUserByRole/${role}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .pipe(map((responseData: any) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements
          };
          return temp;
        }))
        .subscribe((data ) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });

  }

}
