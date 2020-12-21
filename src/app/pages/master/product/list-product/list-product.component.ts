import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product-service/product.service';
import {ProductModel} from '../../../home/model/product.model';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  loadedProduct: ProductModel[] = [];
  tempId = localStorage.getItem('productId');

  constructor(private productService: ProductService, private route: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.onGetProduct();
  }


  // tslint:disable-next-line:typedef
  onGetProduct() {

    this.productService.getProduct()
      .subscribe(data => {
        this.loadedProduct = data;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onGetPackage(productId: string , productName: string) {
    localStorage.setItem('productId', productId);
    if (productName === 'Asuransi Perjalanan'){
      this.route.navigate(['/admin/product/travel']);
    }else if(productName === 'Asuransi Properti/ Harta Benda'){
      this.route.navigate(['/admin/product/property']);
    }else if (productName === 'Asuransi Kecelakaan Diri'){
      this.route.navigate(['/admin/product/pa']);
    }
  }

  // tslint:disable-next-line:typedef
  onAddPackage(productId: string, productName: string) {
    localStorage.setItem('productId', productId);
    if (productName === 'Asuransi Perjalanan'){
      this.route.navigate(['/admin/product/travel/form']);
    }else if (productName === 'Asuransi Properti/ Harta Benda'){
      Swal.fire('Maaf, anda tidak bisa menambahkan produk ini');
    }else if (productName === 'Asuransi Kecelakaan Diri'){
      this.route.navigate(['/admin/product/pa/formPackagePA']);
    }

  }

  // tslint:disable-next-line:typedef
  onLogout() {
    this.authService.logout();
  }
}
