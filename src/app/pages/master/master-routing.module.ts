import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardSubmissionService} from './auth-guard-submission.service';
import {AuthGuardService} from './auth-guard.service';
import {ListAdminComponent} from './admin/list-admin/list-admin.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then((m) => m.TransactionModule),
  },
  {
    path: 'submission',
    loadChildren: () => import('./submission/submission.module').then((m) => m.SubmissionModule),
      canActivate: [AuthGuardSubmissionService]
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then((m) => m.ReportModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'claim-check',
    loadChildren: () => import('./claim-check/claim-check.module').then((m) => m.ClaimCheckModule),
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {
}
