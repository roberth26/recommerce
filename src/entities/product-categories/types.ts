export type ProductCategoryID = string;

export type ProductCategory = {
  id: ProductCategoryID;
  name: string;
};

export type State = {
  byID: Partial<Record<ProductCategoryID, ProductCategory>>;
  allIDs: Array<ProductCategoryID>;
};
