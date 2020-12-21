import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {CategoryPAModel} from './model/categoryPA.model';
import {HttpClient} from '@angular/common/http';
import {PackagePAModel} from './model/packagePA.model';
import {PackageTravelModel} from './model/packageTravel.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryPAService {

  constructor(private httpClient: HttpClient) {}

  getCategoryPA(id): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.httpClient.get('/api/categoryPA/list/' + id)
        .subscribe((response: any) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }


  getPackagePA(): Observable<PackagePAModel[]> {
    return new Observable((observer: Observer<PackagePAModel[]>) => {
      this.httpClient.get('/api/packagesPA/list')
        .subscribe((response: PackagePAModel[]) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  getPackageTravel(): Observable<PackageTravelModel[]> {
    return new Observable((observer: Observer<PackageTravelModel[]>) => {
      this.httpClient.get('/api/packageTravel/list')
        .subscribe((response: PackageTravelModel[]) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  // getAllCategoryList(id): Observable<CategoryPAModel[]> {
  //   return new Observable((observer: Observer<CategoryPAModel[]>) => {
  //     this.httpClient.get('/api/categoryPA/list/' + id)
  //       .subscribe((data: CategoryPAModel[]) => {
  //         observer.next(data);
  //       }, error => {
  //         observer.error(error.message);
  //       });
  //   });
  // }
}
