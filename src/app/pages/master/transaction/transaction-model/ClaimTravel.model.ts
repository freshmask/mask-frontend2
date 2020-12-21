export interface ClaimTravel{
  id: string;
  name: string;
  email: string;
  reportDate: Date;
  incidentDate: Date;
  lossCause: string;
  incidentLocation: string;
  medicalCertificate: string;
  medicalCertificateUri: string;
  medicalExpenses: string;
  medicalExpensesUri: string;
  deathCertificate: string;
  deathCertificateUri: string;
  claimSubmission: number;
  claimApproval: number;
}
