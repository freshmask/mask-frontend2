import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormClaimParComponent} from './form-claim-par/form-claim-par.component';
import {FormClaimPaComponent} from './form-claim-pa/form-claim-pa.component';
import {FormClaimTravelComponent} from './form-claim-travel/form-claim-travel.component';

const routes: Routes = [
  {
    path: 'pars', component : FormClaimParComponent
  },
  {
    path: 'pas', component : FormClaimPaComponent
  },
  {
    path: 'travels', component : FormClaimTravelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimRoutingModule { }
