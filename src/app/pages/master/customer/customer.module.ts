import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import {MasterModule} from "../master.module";


@NgModule({
  declarations: [ListCustomerComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        MasterModule
    ]
})
export class CustomerModule { }
