import {PackagePAModel} from './packagePA.model';

export interface CategoryPAModel{
  categoryId: string;
  days: string;
  price: number;
  pricePromo: number;
  voucher: string;
  packagePA: PackagePAModel;
  isActive: string;
}
