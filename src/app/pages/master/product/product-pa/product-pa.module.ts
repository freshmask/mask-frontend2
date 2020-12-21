import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPaRoutingModule } from './product-pa-routing.module';
import { FormProductPaComponent } from './form-product-pa/form-product-pa.component';
import { ListProductPaComponent } from './list-product-pa/list-product-pa.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormPackagePaComponent } from './form-package-pa/form-package-pa.component';
import {LayoutModule} from '../../../../layout/layout.module';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [FormProductPaComponent, ListProductPaComponent, FormPackagePaComponent],
    imports: [
        CommonModule,
        ProductPaRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        LayoutModule,
        SharedModule
    ]
})
export class ProductPaModule { }
