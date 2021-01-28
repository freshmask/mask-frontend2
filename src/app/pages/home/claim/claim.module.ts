import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimRoutingModule } from './claim-routing.module';
import { FormClaimPaComponent } from './form-claim-pa/form-claim-pa.component';
import { FormClaimParComponent } from './form-claim-par/form-claim-par.component';
import { FormClaimTravelComponent } from './form-claim-travel/form-claim-travel.component';
import {HomeModule} from '../home.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [FormClaimPaComponent, FormClaimParComponent, FormClaimTravelComponent],
  imports: [
    CommonModule,
    ClaimRoutingModule,
    HomeModule,
    FormsModule
  ]
})
export class ClaimModule { }
