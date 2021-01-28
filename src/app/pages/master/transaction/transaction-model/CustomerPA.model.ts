import {transactionPA} from './transactionPA.model';

export interface CustomerPA{
  customerpaId: string;
  name: string;
  identityNo: string;
  identityType: string;
  phoneNumber: string;
  email: string;
  address: string;
  heirName: string;
  relationship: string;
  heirPhoneNumber: string;
  heirEmail: string;
  fileNamePhoto: File;
  fileDownloadUriPhoto: string;
  fileTypePhoto: string;
  fileNameIdentity: File;
  fileDownloadUriIdentity: string;
  fileTypeIdentity: string;
  voucherPA: string;
  transactionPA: transactionPA;
}
