import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormProductPaComponent} from './form-product-pa/form-product-pa.component';
import {ListProductPaComponent} from './list-product-pa/list-product-pa.component';
import {FormPackagePaComponent} from './form-package-pa/form-package-pa.component';

const routes: Routes = [
  {
    path: 'form',
    component: FormProductPaComponent
  },
  {
    path: 'form/:id',
    component: FormProductPaComponent
  },
  {
    path: '',
    component: ListProductPaComponent
  },
  {
    path: 'formPackagePA',
    component: FormPackagePaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPaRoutingModule { }
