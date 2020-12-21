import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmissionRoutingModule } from './submission-routing.module';
import { ClaimParComponent } from './claim-par/claim-par.component';
import { ClaimPaComponent } from './claim-pa/claim-pa.component';
import { ClaimTravelComponent } from './claim-travel/claim-travel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '../../../layout/layout.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [ClaimParComponent, ClaimPaComponent, ClaimTravelComponent],
  imports: [
    CommonModule,
    SubmissionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class SubmissionModule { }
