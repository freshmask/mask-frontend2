import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClaimPaComponent} from './claim-pa/claim-pa.component';
import {ClaimParComponent} from './claim-par/claim-par.component';
import {ClaimTravelComponent} from './claim-travel/claim-travel.component';

const routes: Routes = [
  {
    path: 'claim-pa',
    component: ClaimPaComponent
  },
  {
    path: 'claim-par',
    component: ClaimParComponent
  },
  {
    path: 'claim-travel',
    component: ClaimTravelComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmissionRoutingModule { }
