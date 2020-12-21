import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// @ts-ignore
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import {LayoutModule} from '../../../layout/layout.module';
// @ts-ignore
import { FormChangePasswordComponent } from './form-change-password/form-change-password.component';
import {ChartsModule} from 'ng2-charts';


@NgModule({
    declarations: [ListAdminComponent, DashboardComponent, ProfilAdminComponent, FormChangePasswordComponent],
    exports: [
        DashboardComponent
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    ChartsModule
  ]
})
export class AdminModule { }
