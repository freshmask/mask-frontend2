export interface ClaimPAR{
  claimparId: string;
  name: string;
  email: string;
  reportDate: Date;
  incidentDate: Date;
  lossCause: string;
  incidentLocation: string;
  claimApproval: number;
  claimSubmission: number;
  buildingType: string;
  furnitureType: string;
  machineType: string;
  lossReportUri: string;
  authoritiesReportUri: string;

}
