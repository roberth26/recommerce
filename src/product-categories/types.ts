export type ProductCategoryID = string;

export interface ProductCategory {
  id: ProductCategoryID;
  name: string;
  slug: string;
}

export interface State {
  byID: Partial<Record<ProductCategoryID, ProductCategory>>;
  idsBySlug: Partial<Record<ProductCategory['slug'], ProductCategoryID>>;
  allIDs: Array<ProductCategoryID>;
}
