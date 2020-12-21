import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormProductTravelComponent} from './form-product-travel/form-product-travel.component';
import {ListProductTravelComponent} from './list-product-travel/list-product-travel.component';
import {FormProductPaComponent} from '../product-pa/form-product-pa/form-product-pa.component';

const routes: Routes = [
  {
    path: 'form',
    component: FormProductTravelComponent
  },
  {
    path: '',
    component: ListProductTravelComponent
  },
  {
    path: 'form/:id',
    component: FormProductTravelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductTravelRoutingModule { }
