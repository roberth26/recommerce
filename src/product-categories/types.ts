export type ProductCategoryID = string;

export interface ProductCategory {
  id: ProductCategoryID;
  name: string;
}

export interface State {
  byID: Partial<Record<ProductCategoryID, ProductCategory>>;
  allIDs: Array<ProductCategoryID>;
}
