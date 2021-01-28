export interface ClaimsTravel{
  // id: string;
  nameOfTheInsured: string;
  emailOfTheInsured: string;
  identityNumber: string;
  heirName: string;
  heirEmail: string;
  reportDate: Date;
  incidentDate: Date;
  lossCause: string;
  incidentLocation: string;
  claimSubmission: number;
  claimApproval: number;
  polisId: string;
  medicalCertificate: File;
  // medicalCertificateUri: string;
  medicalExpenses: File;
  // medicalExpensesUri: string;
  deathCertificate: File;
  // deathCertificateUri: string;
}
