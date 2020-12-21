import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductParComponent} from './product-par/product-par.component';
import {ProductPaComponent} from './product-pa/product-pa.component';
import {ProductTravelComponent} from './product-travel/product-travel.component';
const routes: Routes = [
  {
    path: 'par', component : ProductParComponent
  },
  {
    path: 'pa', component : ProductPaComponent
  },
  {
    path: 'travel', component : ProductTravelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
