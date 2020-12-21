import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListPackageProductComponent} from './list-package-product/list-package-product.component';
import {ListProductComponent} from './list-product/list-product.component';

const routes: Routes = [
  {
    path: 'package',
    component: ListPackageProductComponent
  },
  {
    path: 'pa',
    loadChildren: () => import('./product-pa/product-pa.module').then((m) => m.ProductPaModule),
  },
  {
    path: 'travel',
    loadChildren: () => import('./product-travel/product-travel.module').then((m) => m.ProductTravelModule),

  },
  {
    path: 'property',
    loadChildren: () => import('./product-par/product-par.module').then((m) => m.ProductParModule),
  },
  {
    path: 'all',
    component: ListProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
