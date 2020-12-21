export interface CustomerTravel{
  customertravelId: string;
  name: string;
  address: string;
  identityType: string;
  identityNo: string;
  phoneNumber: string;
  email: string;
  heirName: string;
  heirPhoneNumber: string;
  relationship: string;
  heirEmail: string;
  travelKind: string;
  departureCity: string;
  destinationCity: string;
  departureDate: Date;
  journeyLength: string;
  departurePurpose: string;
  fileNamePhoto: string;
  fileDownloadUriPhoto: File;
  fileTypePhoto: string;
  fileNameIdentity: string;
  fileDownloadUriIdentity: File;
  fileTypeIdentity: string;
  voucherTravel: string;
  // transactionTravel
}
