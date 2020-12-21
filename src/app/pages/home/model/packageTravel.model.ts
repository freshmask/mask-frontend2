import {ProductModel} from './product.model';

export interface PackageTravelModel{
  ptId: string;
  name: string;
  days: number;
  price: number;
  pricePromo: number;
  voucher: string;
  product: ProductModel;
  isActive: string;
}
