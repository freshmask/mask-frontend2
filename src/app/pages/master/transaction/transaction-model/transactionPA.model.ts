import {CategoryPAModel} from '../../../home/model/categoryPA.model';
import {CustomerPA} from './CustomerPA.model';

// tslint:disable-next-line:class-name
export interface transactionPA{
  trxpaId: string;
  startDate: Date;
  expDate: Date;
  isPayment: string;
  isClaim: string;
  premi: number;
  statusPolis: string;
  statusClaim: string;
  adminFee: number;
  isPromo: string;
  categoryPA: CategoryPAModel;
  customerPA: CustomerPA;
}
