import { ProductCategoryID, ProductCategory } from './types';

export enum ActionType {
  REQUEST_PRODUCT_CATEGORIES = '@@product-categories/REQUEST_PRODUCT_CATEGORIES',
  REQUEST_PRODUCT_CATEGORY = '@@product-categories/REQUEST_PRODUCT_CATEGORY',
  RECEIVE_PRODUCT_CATEGORIES = '@@product-categories/RECEIVE_PRODUCT_CATEGORIES',
  RECEIVE_PRODUCT_CATEGORY = '@@product-categories/RECEIVE_PRODUCT_CATEGORY',
  CREATE_PRODUCT_CATEGORY = '@@product-categories/CREATE_PRODUCT_CATEGORY',
  UPDATE_PRODUCT_CATEGORY = '@@product-categories/UPDATE_PRODUCT_CATEGORY',
  DELETE_PRODUCT_CATEGORY = '@@product-categories/DELETE_PRODUCT_CATEGORY',
  PRODUCT_CATEGORY_DELETED = '@@product-categories/PRODUCT_CATEGORY_DELETED',
}

export interface RequestProductCategories {
  type: ActionType.REQUEST_PRODUCT_CATEGORIES;
  meta?: {
    id: string;
  };
}

export function requestProductCategories(
  meta?: RequestProductCategories['meta']
): RequestProductCategories {
  return {
    type: ActionType.REQUEST_PRODUCT_CATEGORIES,
    meta,
  };
}

export interface RequestProductCategory {
  type: ActionType.REQUEST_PRODUCT_CATEGORY;
  payload:
    | {
        productCategoryID: ProductCategoryID;
        productCategorySlug?: never;
      }
    | {
        productCategoryID?: never;
        productCategorySlug: ProductCategory['slug'];
      };
  meta?: {
    id: string;
  };
}

export function requestProductCategory(
  payload: RequestProductCategory['payload'],
  meta?: RequestProductCategory['meta']
): RequestProductCategory {
  return {
    type: ActionType.REQUEST_PRODUCT_CATEGORY,
    payload,
    meta,
  };
}

export interface ReceiveProductCategories {
  type: ActionType.RECEIVE_PRODUCT_CATEGORIES;
  payload: {
    productCategories: Array<ProductCategory>;
  };
  meta?: {
    id: string;
  };
}

export function receiveProductCategories(
  payload: ReceiveProductCategories['payload'],
  meta?: ReceiveProductCategories['meta']
): ReceiveProductCategories {
  return {
    type: ActionType.RECEIVE_PRODUCT_CATEGORIES,
    payload,
    meta,
  };
}

export interface ReceiveProductCategory {
  type: ActionType.RECEIVE_PRODUCT_CATEGORY;
  payload: {
    productCategory: ProductCategory;
  };
  meta?: {
    id: string;
  };
}

export function receiveProductCategory(
  payload: ReceiveProductCategory['payload'],
  meta?: ReceiveProductCategory['meta']
): ReceiveProductCategory {
  return {
    type: ActionType.RECEIVE_PRODUCT_CATEGORY,
    payload,
    meta,
  };
}

export interface CreateProductCategory {
  type: ActionType.CREATE_PRODUCT_CATEGORY;
  payload: {
    productCategory: ProductCategory;
  };
  meta?: {
    id: string;
  };
}

export function createProductCategory(
  payload: CreateProductCategory['payload'],
  meta?: CreateProductCategory['meta']
): CreateProductCategory {
  return {
    type: ActionType.CREATE_PRODUCT_CATEGORY,
    payload,
    meta,
  };
}

export interface UpdateProductCategory {
  type: ActionType.UPDATE_PRODUCT_CATEGORY;
  payload: {
    productCategory: ProductCategory;
  };
  meta?: {
    id: string;
  };
}

export function updateProductCategory(
  payload: UpdateProductCategory['payload'],
  meta?: UpdateProductCategory['meta']
): UpdateProductCategory {
  return {
    type: ActionType.UPDATE_PRODUCT_CATEGORY,
    payload,
    meta,
  };
}

export interface DeleteProductCategory {
  type: ActionType.DELETE_PRODUCT_CATEGORY;
  payload: {
    productCategory: ProductCategory;
  };
  meta?: {
    id: string;
  };
}

export function deleteProductCategory(
  payload: DeleteProductCategory['payload'],
  meta?: DeleteProductCategory['meta']
): DeleteProductCategory {
  return {
    type: ActionType.DELETE_PRODUCT_CATEGORY,
    payload,
    meta,
  };
}

export interface ProductCategoryDeleted {
  type: ActionType.PRODUCT_CATEGORY_DELETED;
  payload: {
    productCategory: ProductCategory;
  };
  meta?: {
    id: string;
  };
}

export function productCategoryDeleted(
  payload: ProductCategoryDeleted['payload'],
  meta?: ProductCategoryDeleted['meta']
): ProductCategoryDeleted {
  return {
    type: ActionType.PRODUCT_CATEGORY_DELETED,
    payload,
    meta,
  };
}

export type AnyAction =
  | RequestProductCategories
  | RequestProductCategory
  | ReceiveProductCategories
  | ReceiveProductCategory
  | CreateProductCategory
  | UpdateProductCategory
  | DeleteProductCategory
  | ProductCategoryDeleted;
