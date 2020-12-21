import {PackageTravelModel} from '../../../home/model/packageTravel.model';
import {CustomerTravel} from './CustomerTravel.model';

export interface transactionTravel{
  id: string;
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
  packageTravel: PackageTravelModel;
  customerTravel: CustomerTravel;
}
