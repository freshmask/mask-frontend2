import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiResponsPage, User} from '../user/user.model';
import {HttpClient} from '@angular/common/http';
import {ClaimPAR} from '../transaction/transaction-model/ClaimPAR.model';
import {PackageTravelModel} from '../../home/model/packageTravel.model';
import {ClaimPA} from '../transaction/transaction-model/ClaimPA.model';
import {ClaimTravel} from '../transaction/transaction-model/ClaimTravel.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  claimpa = JSON.parse(localStorage.getItem('claimPA'));
  claimtravel = JSON.parse(localStorage.getItem('claimTravel'));
  claimpar = JSON.parse(localStorage.getItem('claimPAR'));

  constructor(private http: HttpClient) {}

  getClaimTravel(page: number, size: number): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/claimtravel?page=${page - 1}&size=${size}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
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

  getClaimPA(page: number, size: number): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/claimPA?page=${page - 1}&size=${size}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
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


  getClaimPAR(page: number, size: number): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/claimsPAR?page=${page - 1}&size=${size}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
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

  getClaimPARById(id): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`/api/claimPAR/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, id)
        .subscribe((response: any) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }


  approvalClaimPAR(id, claimPAR): Observable<ClaimPAR[]> {
    return new Observable((observer: Observer<ClaimPAR[]>) => {
      this.http.put(`/api/approvedClaimPAR/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, claimPAR)
        .subscribe((response: ClaimPAR[]) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });
  }

  approvalClaimPA(id, claimPA): Observable<ClaimPA[]> {
    return new Observable((observer: Observer<ClaimPA[]>) => {
      this.http.put(`/api/approvedClaimPA/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, claimPA)
        .subscribe((response: ClaimPA[]) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });
  }

  approvalClaimTravel(id, claimTravel): Observable<ClaimTravel[]> {
    return new Observable((observer: Observer<ClaimTravel[]>) => {
      this.http.put(`/api/approvedTravel/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, claimTravel)
        .subscribe((response: ClaimTravel[]) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });
  }

  rejectedClaimPAR(id: string, valueDesc): Observable<ClaimPAR> {
    return new Observable((observer: Observer<ClaimPAR>) => {
      // tslint:disable-next-line:max-line-length
      this.http.put(`api/rejectedClaimPAR/${id}?description=${valueDesc}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, id)
        .subscribe((response: ClaimPAR) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  rejectedClaimPA(id: string, valueDesc): Observable<ClaimPA> {
    return new Observable((observer: Observer<ClaimPA>) => {
      this.http.put(`api/rejectedClaimPA/${id}?description=${valueDesc}&access_token=${JSON.parse(window.sessionStorage.getItem('token')).access_token}`, id)
        .subscribe((response: ClaimPA) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  rejectedClaimTravel(id: string, valueDesc): Observable<ClaimTravel> {
    return new Observable((observer: Observer<ClaimTravel>) => {
      // tslint:disable-next-line:max-line-length
      this.http.put(`api/rejectedTravel/${id}?description=${valueDesc}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, id)
        .subscribe((response: ClaimTravel) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  getMedicalCertificatePA(fileName): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      // tslint:disable-next-line:max-line-length
      this.http.get(`api/document-claim/${fileName}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', fileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getDeathCertificatePA(deathCertificateName): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/document-claim/${deathCertificateName}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', deathCertificateName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getMedicalExpensesPA(medicalExpensesName): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/document-claim/${medicalExpensesName}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', medicalExpensesName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getMedicalCertificateTravel(medicalCertificateName): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/document-claim/${medicalCertificateName}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', medicalCertificateName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getDeathCertificateTravel(deathCertificateName): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/document-claim/${deathCertificateName}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', deathCertificateName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getMedicalExpensesTravel(medicalExpensesName): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/document-claim/${medicalExpensesName}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', medicalExpensesName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getLossReport(lossReportName): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/document-claim/${lossReportName}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', lossReportName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getAuthoritiesReport(authoritiesReportName): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/document-claim/${authoritiesReportName}?access_token=` + (JSON.parse(window.sessionStorage.getItem('token')).access_token), { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', authoritiesReportName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });
  }

}
