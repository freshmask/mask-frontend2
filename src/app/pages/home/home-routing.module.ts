import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ProductComponent} from './product/product.component';

const routes: Routes = [
  {
    path: '', component : HomepageComponent
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule)
  },
  {
    path: 'claim',
    loadChildren: () => import('./claim/claim.module').then((m) => m.ClaimModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
