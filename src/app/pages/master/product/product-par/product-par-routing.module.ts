import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormProductParComponent} from './form-product-par/form-product-par.component';
import {ListProductParComponent} from './list-product-par/list-product-par.component';

const routes: Routes = [
  {
    path: 'form',
    component: FormProductParComponent
  },
  {
    path: '',
    component: ListProductParComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductParRoutingModule { }
