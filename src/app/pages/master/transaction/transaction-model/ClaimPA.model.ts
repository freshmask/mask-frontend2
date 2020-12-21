import {Transaction} from './Transaction.model';

export interface ClaimPA{
  id: string;
  name: string;
  email: string;
  reportDate: Date;
  incidentDate: Date;
  lossCause: string;
  incidentLocation: string;
  claimSubmission: number;
  claimApproval: number;
  medicalCertificate: string;
  medicalCertificateUri: string;
  medicalExpenses: string;
  medicalExpensesUri: string;
  deathCertificate: string;
  deathCertificateUri: string;
}
