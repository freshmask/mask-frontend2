import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductPaComponent } from './product-pa/product-pa.component';
import { ProductParComponent } from './product-par/product-par.component';
import { ProductTravelComponent } from './product-travel/product-travel.component';
import {HomeModule} from '../home.module';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [ProductPaComponent, ProductParComponent, ProductTravelComponent],
    imports: [
        CommonModule,
        ProductRoutingModule,
        HomeModule,
        SharedModule
    ]
})
export class ProductModule { }
