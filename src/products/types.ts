import {
  ProductCategory,
  ProductCategoryID,
} from '../product-categories/types';

export type ProductID = string;

export type Product<
  TCategory extends ProductCategoryID | ProductCategory =
    | ProductCategoryID
    | ProductCategory
> = {
  id: ProductID;
  name: string;
  price: number;
  category: TCategory | null;
  imageURI: string;
  rating: number | null;
  description: string;
};

export type State = {
  byID: Partial<Record<ProductID, Product<ProductCategoryID>>>;
  allIDs: Array<ProductID>;
  idsByProductCategoryID: Partial<Record<ProductCategoryID, Array<ProductID>>>;
};
