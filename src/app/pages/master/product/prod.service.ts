import {Injectable} from '@angular/core';
import {PackageTravelModel} from '../../home/model/packageTravel.model';
import {Observable, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProductModel} from '../../home/model/product.model';
import {CategoryPAModel} from '../../home/model/categoryPA.model';
import {PackagePAModel} from '../../home/model/packagePA.model';

@Injectable({
  providedIn: 'root'
})
export class ProdService {
  product: { productId: '', productName: '' };

  constructor(private http: HttpClient) {
  }

  getPackageTaBypackageId(id: string): Observable<PackageTravelModel> {
    return new Observable((observer: Observer<PackageTravelModel>) => {
      this.http.get(`api/packageTravel/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((response: PackageTravelModel) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  // tslint:disable-next-line:typedef
  addPackageTa(postData: PackageTravelModel, id: string) {
    return new Observable((observer: Observer<PackageTravelModel>) => {
      if (id) {
        console.log(postData);
        this.http.put('/api/packageTravel?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: PackageTravelModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/packageTravel?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: PackageTravelModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      }
    });
  }

  getProduct(): Observable<ProductModel[]> {
    return new Observable((observer: Observer<ProductModel[]>) => {
      this.http.get('api/products/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ProductModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getCategoryByproductId(id: string): Observable<CategoryPAModel> {
    return new Observable((observer: Observer<CategoryPAModel>) => {
      this.http.get(`api/categoryPA/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((response: CategoryPAModel) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  addCategoryPa(postData: CategoryPAModel, id: string) {
    return new Observable((observer: Observer<CategoryPAModel>) => {
      if (id) {
        this.http.put('/api/categoryPA?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: CategoryPAModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/categoryPA?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: CategoryPAModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      }
    });
  }

  getPackage(): Observable<PackagePAModel[]> {
    return new Observable((observer: Observer<PackagePAModel[]>) => {
      this.http.get('api/packagesPA/list?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: PackagePAModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getPackagePA(): Observable<PackagePAModel[]> {
    return new Observable((observer: Observer<PackagePAModel[]>) => {
      this.http.get('api/packagesPA/list')
        .subscribe((data: PackagePAModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getPackageTravel(): Observable<PackageTravelModel[]> {
    return new Observable((observer: Observer<PackageTravelModel[]>) => {
      this.http.get('/api/packageTravel/list')
        .subscribe((response: PackageTravelModel[]) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  getAllPacckageTaList(): Observable<PackageTravelModel[]> {
    return new Observable((observer: Observer<PackageTravelModel[]>) => {
      this.http.get('/api/packageTravel/list')
        .subscribe((response: PackageTravelModel[]) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  changeStatus(ptId: string): Observable<PackageTravelModel> {
    return new Observable((observer: Observer<any>) => {
      this.http.put(`api/travelstatus/${ptId}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, ptId)
        .subscribe((data: any) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  // tslint:disable-next-line:typedef
  changeStatusPa(categoryId: string): Observable<CategoryPAModel> {
    return new Observable((observer: Observer<any>) => {
      this.http.put(`api/categorystatus/${categoryId}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, categoryId)
        .subscribe((data: any) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getPackagePaBypackageId(id: string): Observable<PackagePAModel> {
    return new Observable((observer: Observer<PackagePAModel>) => {
      this.http.get(`api/packagePA/list/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((response: PackagePAModel) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });

  }

  // tslint:disable-next-line:typedef
  addPackagePa(packagePA: PackagePAModel, id: string) {
    return new Observable((observer: Observer<PackagePAModel>) => {
      if (id) {
        this.http.put('/api/packagePA?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, packagePA)
          .subscribe((response: PackagePAModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {

        this.http.post('/api/packagePA?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, packagePA)
          .subscribe((response: PackagePAModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      }
    });
  }
}
