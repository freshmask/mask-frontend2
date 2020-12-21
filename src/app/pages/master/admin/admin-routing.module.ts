import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ListAdminComponent} from './list-admin/list-admin.component';
import {ProfilAdminComponent} from './profil-admin/profil-admin.component';
import {FormChangePasswordComponent} from './form-change-password/form-change-password.component';
import {AuthGuardService} from '../auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'list',
    canActivate: [AuthGuardService],
    component: ListAdminComponent
  },
  {
    path: 'profil',
    component: ProfilAdminComponent
  },
  {
    path: 'change',
    component: FormChangePasswordComponent
  },
  {
    path: 'change/:id',
    component: FormChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
