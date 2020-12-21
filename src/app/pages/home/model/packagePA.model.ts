import {ProductModel} from './product.model';

export interface PackagePAModel{
  paId: string;
  name: string;
  compensation: number;
  product: ProductModel;
}
