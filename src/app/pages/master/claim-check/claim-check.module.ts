import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimCheckRoutingModule } from './claim-check-routing.module';
import { ClaimCheckPaComponent } from './claim-check-pa/claim-check-pa.component';
import { ClaimCheckParComponent } from './claim-check-par/claim-check-par.component';
import { ClaimCheckTravelComponent } from './claim-check-travel/claim-check-travel.component';
import {LayoutModule} from '../../../layout/layout.module';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [ClaimCheckPaComponent, ClaimCheckParComponent, ClaimCheckTravelComponent],
  imports: [
    CommonModule,
    ClaimCheckRoutingModule,
    LayoutModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ClaimCheckModule { }
