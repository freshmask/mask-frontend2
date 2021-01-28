import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClaimCheckPaComponent} from './claim-check-pa/claim-check-pa.component';
import {ClaimCheckParComponent} from './claim-check-par/claim-check-par.component';
import {ClaimCheckTravelComponent} from './claim-check-travel/claim-check-travel.component';

const routes: Routes = [
  {
    path: 'pa',
    component: ClaimCheckPaComponent
  },
  {
    path: 'par',
    component: ClaimCheckParComponent
  },
  {
    path: 'travel',
    component: ClaimCheckTravelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimCheckRoutingModule { }
