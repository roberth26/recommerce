import {
  ProductCategory,
  ProductCategoryID,
} from '../product-categories/types';

export type ProductID = string;

export type ProductProductCategory = ProductCategoryID | ProductCategory;

export type Product<
  TProductProductCategory extends ProductProductCategory = ProductProductCategory
> = {
  id: ProductID;
  name: string;
  price: number;
  category: TProductProductCategory | null;
  imageURI: string;
  rating: number | null;
  description: string;
};

export type State = {
  byID: Partial<Record<ProductID, Product<ProductCategoryID>>>;
  allIDs: Array<ProductID>;
  idsByProductCategoryID: Partial<Record<ProductCategoryID, Array<ProductID>>>;
};
