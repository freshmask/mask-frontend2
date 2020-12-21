import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {LayoutModule} from '../../../layout/layout.module';


@NgModule({
  declarations: [ListUserComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        NgxPaginationModule,
        FormsModule,
        LayoutModule
    ]
})
export class UserModule { }
