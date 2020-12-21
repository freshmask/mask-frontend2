import {transactionPA} from './transactionPA.model';

export interface CustomerPAR{
  id: string;
  name: string;
  identityType: string;
  identityNo: string;
  phoneNumber: string;
  email: string;
  timePeriod: number;
  riskLocation: string;
  occupation: string;
  constructionClass: string;
  buildingYear: string;
  floorNumber: string;
  sprinkle: string;
  buildingType: string;
  buildingCoverageValue: number;
  machineType: string;
  machineCoverageValue: number;
  furnitureType: string;
  furnitureCoverageValue: number;
  pump: string;
  fireAlarm: string;
  address: string;
  documentName: string;
  documentUri: File;
}
