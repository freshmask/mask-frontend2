import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TransactionRoutingModule} from './transaction-routing.module';
import {ListTransactionComponent} from './list-transaction/list-transaction.component';
import {HistoryTransactionComponent} from './history-transaction/history-transaction.component';
import {TransactionByUserComponent} from './transaction-by-user/transaction-by-user.component';
import {TransactionByPromoComponent} from './transaction-by-promo/transaction-by-promo.component';
import {TransactionByPolisComponent} from './transaction-by-polis/transaction-by-polis.component';
import {TransactionPaListComponent} from './transaction-pa-list/transaction-pa-list.component';
import {TransactionParListComponent} from './transaction-par-list/transaction-par-list.component';
import {TransactionTravelListComponent} from './transaction-travel-list/transaction-travel-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {LayoutModule} from '../../../layout/layout.module';
import { TransactionByPolisPeriodComponent } from './transaction-by-polis-period/transaction-by-polis-period.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [ListTransactionComponent, HistoryTransactionComponent, TransactionByUserComponent, TransactionByPromoComponent, TransactionByPolisComponent, TransactionPaListComponent, TransactionParListComponent, TransactionTravelListComponent, TransactionByPolisPeriodComponent],
    imports: [
        CommonModule,
        TransactionRoutingModule,
        NgxPaginationModule,
        FormsModule,
        LayoutModule,
        SharedModule
    ]
})
export class TransactionModule { }
