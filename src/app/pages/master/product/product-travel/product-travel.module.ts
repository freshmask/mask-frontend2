import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductTravelRoutingModule } from './product-travel-routing.module';
import { FormProductTravelComponent } from './form-product-travel/form-product-travel.component';
import { ListProductTravelComponent } from './list-product-travel/list-product-travel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '../../../../layout/layout.module';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [FormProductTravelComponent, ListProductTravelComponent],
    imports: [
        CommonModule,
        ProductTravelRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        LayoutModule,
        SharedModule
    ]
})
export class ProductTravelModule { }
