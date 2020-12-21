// tslint:disable-next-line:no-empty-interface
import {User} from '../../auth/user.model';
import {ClaimPA} from './ClaimPA.model';
import {ClaimPAR} from './ClaimPAR.model';
import {ClaimTravel} from './ClaimTravel.model';
import {transactionPA} from './transactionPA.model';
import {transactionTravel} from './TransactionTravel.model';
import {transactionPAR} from './TransactionPAR.model';

export interface Transaction{
  id: string;
  users: User;
  claimPA: ClaimPA;
  claimPAR: ClaimPAR;
  claimTravel: ClaimTravel;
  transactionPA: transactionPA;
  transactionTravel: transactionTravel;
  transactionPAR: transactionPAR;
}
