import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiResponsPage, User} from '../user/user.model';
import {HttpClient} from '@angular/common/http';
import {Transaction} from './transaction-model/Transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getAllTransaction(page: number, size: number): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/transactions?page=${page - 1}&size=${size}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .pipe(map((responseData: any) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements
          };
          return temp;
        }))
        .subscribe((data: ApiResponsPage ) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  getTransactionPA(page: number, size: number): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/transactionsPA?page=${page - 1}&size=${size}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .pipe(map((responseData: any) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements
          };
          return temp;
        }))
        .subscribe((data: ApiResponsPage ) => {
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

  getTransactionTA(page: number, size: number): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/transactiontravel?page=${page - 1}&size=${size}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .pipe(map((responseData: any) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements
          };
          return temp;
        }))
        .subscribe((data: ApiResponsPage ) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  getAllTransactionTAList(): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get('api/transactiontravel/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: any) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  getTransactionPAR(page: number, size: number): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/transactionsPAR?page=${page - 1}&size=${size}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .pipe(map((responseData: any) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements
          };
          return temp;
        }))
        .subscribe((data: ApiResponsPage ) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  getAllTransactionPARList(): Observable<any>  {
    return new Observable((observer: Observer<any>) => {
      this.http.get('api/transactionPAR/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: any) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  getTransactionByPolis(): Observable<any[]>  {
    return new Observable((observer: Observer<any[]>) => {
      this.http.get('api/transactionsByPolis/aktif?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: any[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  // tslint:disable-next-line:typedef
  getTransactionByPolisInActive(status) {
    return new Observable((observer: Observer<any[]>) => {
      this.http.get(`api/transactionsByPolis/${status}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: any[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  // tslint:disable-next-line:typedef
  getTransactionByPromo() {
    return new Observable((observer: Observer<any[]>) => {
      this.http.get('api/transactionsByPromo/true?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: any[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  // tslint:disable-next-line:typedef
  getTransactionByPromoInActive() {
    return new Observable((observer: Observer<any[]>) => {
      this.http.get('api/transactionsByPromo/false?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: any[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getTransactionByUser(id): Observable<Transaction[]>  {
    return new Observable((observer: Observer<Transaction[]>) => {
      this.http.get(`api/transactionuser/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((response: Transaction[]) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });

  }

  getSwafotoPA(fileNamePhoto, name): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      // tslint:disable-next-line:max-line-length
      this.http.get(`api/document-customer/${fileNamePhoto}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', fileNamePhoto);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  getDocumentPAR(documentName: string, name): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      // tslint:disable-next-line:max-line-length
      this.http.get(`api/document-customer/${documentName}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', documentName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  getSwafotoTravel(fileNamePhoto: string, name: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      // tslint:disable-next-line:max-line-length
      this.http.get(`api/document-customer/${fileNamePhoto}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', fileNamePhoto);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  getFotoktpPA(fileNameIdentity, heirName: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      // tslint:disable-next-line:max-line-length
      this.http.get(`api/document-customer/${fileNameIdentity}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', fileNameIdentity);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  getFotoktpTravel(fileNameIdentity: string, name: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      // tslint:disable-next-line:max-line-length
      this.http.get(`api/document-customer/${fileNameIdentity}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', fileNameIdentity);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });

  }

  getPolisPeriod(periode: number): Observable<Transaction[]>  {
    return new Observable((observer: Observer<Transaction[]>) => {
      this.http.get(`api/transactionsByPolisperPeriode?statusPolis=aktif&periode=${periode}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((response: Transaction[]) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  getPolisPeriod2(date1: Date, date2: Date): Observable<Transaction[]>  {
    return new Observable((observer: Observer<Transaction[]>) => {
      this.http.get(`api/transactionsPolisPeriod?statusPolis=aktif&date1=${date1}&date2=${date2}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((response: Transaction[]) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }


  getPolisByStatus(): Observable<Transaction[]>  {
    return new Observable((observer: Observer<Transaction[]>) => {
      this.http.get(`api/transactionsByPolis/aktif?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((response: Transaction[]) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }
}
