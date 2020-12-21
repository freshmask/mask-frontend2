export interface User{
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  birthdate: Date;
  gender: string;
  role: string;
  isActive: string;
  phoneNumber: string;
  fingerData: string;
  fileName: string;
  fileDownloadUri: string;
  fileType: string;
}

export interface ApiResponsPage{
  content: User[],
  totalPages: number,
  totalElements: number,
  numberOfElements: number
}


