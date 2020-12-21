import { Injectable } from '@angular/core';
import {ProductModel} from '../../../home/model/product.model';
import {Observable, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }



  getProduct(): Observable<ProductModel[]> {

    return new Observable((observer: Observer<ProductModel[]>) => {
      this.http.get (`api/products/list?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ProductModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });

  }
}
