import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListPackageProductComponent } from './list-package-product/list-package-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import {MasterModule} from '../master.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '../../../layout/layout.module';


@NgModule({
  declarations: [ListPackageProductComponent, ListProductComponent],
    imports: [
        CommonModule,
        ProductRoutingModule,
        MasterModule,
        ReactiveFormsModule,
        LayoutModule
    ]
})
export class ProductModule { }
