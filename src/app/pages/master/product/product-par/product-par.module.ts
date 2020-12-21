import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductParRoutingModule } from './product-par-routing.module';
import { ListProductParComponent } from './list-product-par/list-product-par.component';
import { FormProductParComponent } from './form-product-par/form-product-par.component';
import {LayoutModule} from '../../../../layout/layout.module';


@NgModule({
  declarations: [ListProductParComponent, FormProductParComponent],
    imports: [
        CommonModule,
        ProductParRoutingModule,
        LayoutModule
    ]
})
export class ProductParModule { }
