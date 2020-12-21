import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTransactionComponent} from './list-transaction/list-transaction.component';
import {HistoryTransactionComponent} from './history-transaction/history-transaction.component';
import {TransactionTravelListComponent} from './transaction-travel-list/transaction-travel-list.component';
import {TransactionPaListComponent} from './transaction-pa-list/transaction-pa-list.component';
import {TransactionParListComponent} from './transaction-par-list/transaction-par-list.component';
import {TransactionByUserComponent} from './transaction-by-user/transaction-by-user.component';
import {TransactionByPolisComponent} from './transaction-by-polis/transaction-by-polis.component';
import {TransactionByPromoComponent} from './transaction-by-promo/transaction-by-promo.component';
import {FormPackagePaComponent} from '../product/product-pa/form-package-pa/form-package-pa.component';
import {TransactionByPolisPeriodComponent} from './transaction-by-polis-period/transaction-by-polis-period.component';

const routes: Routes = [
  {
    path: '',
    component: ListTransactionComponent
  },
  {
    path: 'history',
    component: HistoryTransactionComponent
  },
  {
    path: 'palist',
    component: TransactionPaListComponent
  },
  {
    path: 'talist',
    component: TransactionTravelListComponent
  },
  {
    path: 'parlist',
    component: TransactionParListComponent
  },
  {
    path: 'byUser',
    component: TransactionByUserComponent
  },
  {
    path: 'byPolis',
    component: TransactionByPolisComponent
  },
  {
    path: 'byPromo',
    component: TransactionByPromoComponent
  },
  {
    path: 'byUser/:id',
    component: TransactionByUserComponent
  },
  {
    path: 'byPolisPeriod',
    component: TransactionByPolisPeriodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
