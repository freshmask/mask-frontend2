import {ProductModel} from '../../../home/model/product.model';
import {CustomerPAR} from './CustomerPAR.model';

// tslint:disable-next-line:class-name
export interface transactionPAR{
  trxparId: string;
  startDate: Date;
  expDate: Date;
  isPayment: string;
  isClaim: string;
  premi: number;
  statusPolis: string;
  statusClaim: string;
  adminFee: number;
  isPromo: string;
  // transaction
   product: ProductModel;
   customerPAR: CustomerPAR;
}

