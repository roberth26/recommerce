import { ProductID, Product } from './types';
import { ProductCategoryID } from '../product-categories/types';

export enum ActionType {
  REQUEST_PRODUCTS = '@@products/REQUEST_PRODUCTS',
  REQUEST_PRODUCT = '@@products/REQUEST_PRODUCT',
  RECEIVE_PRODUCTS = '@@products/RECEIVE_PRODUCTS',
  RECEIVE_PRODUCT = '@@products/RECEIVE_PRODUCT',
  CREATE_PRODUCT = '@@products/CREATE_PRODUCT',
  UPDATE_PRODUCT = '@@products/UPDATE_PRODUCT',
  DELETE_PRODUCT = '@@products/DELETE_PRODUCT',
  PRODUCT_DELETED = '@@products/PRODUCT_DELETED',
}

export interface RequestProducts {
  type: ActionType.REQUEST_PRODUCTS;
  payload?: {
    productCategoryID?: ProductCategoryID | null;
  };
  meta?: {
    id: string;
  };
}

export function requestProducts(
  payload?: RequestProducts['payload'],
  meta?: RequestProducts['meta']
): RequestProducts {
  return {
    type: ActionType.REQUEST_PRODUCTS,
    payload,
    meta,
  };
}

export interface RequestProduct {
  type: ActionType.REQUEST_PRODUCT;
  payload: {
    productID: ProductID;
  };
  meta?: {
    id: string;
  };
}

export function requestProduct(
  payload: RequestProduct['payload'],
  meta?: RequestProduct['meta']
): RequestProduct {
  return {
    type: ActionType.REQUEST_PRODUCT,
    payload,
    meta,
  };
}

export interface ReceiveProducts {
  type: ActionType.RECEIVE_PRODUCTS;
  payload: {
    products: Array<Product>;
  };
  meta?: {
    id: string;
  };
}

export function receiveProducts(
  payload: ReceiveProducts['payload'],
  meta?: ReceiveProducts['meta']
): ReceiveProducts {
  return {
    type: ActionType.RECEIVE_PRODUCTS,
    payload,
    meta,
  };
}

export interface ReceiveProduct {
  type: ActionType.RECEIVE_PRODUCT;
  payload: {
    product: Product;
  };
  meta?: {
    id: string;
  };
}

export function receiveProduct(
  payload: ReceiveProduct['payload'],
  meta?: ReceiveProduct['meta']
): ReceiveProduct {
  return {
    type: ActionType.RECEIVE_PRODUCT,
    payload,
    meta,
  };
}

export interface CreateProduct {
  type: ActionType.CREATE_PRODUCT;
  payload: {
    product: Product;
  };
  meta?: {
    id: string;
  };
}

export function createProduct(
  payload: CreateProduct['payload'],
  meta?: CreateProduct['meta']
): CreateProduct {
  return {
    type: ActionType.CREATE_PRODUCT,
    payload,
    meta,
  };
}

export interface UpdateProduct {
  type: ActionType.UPDATE_PRODUCT;
  payload: {
    product: Product;
  };
  meta?: {
    id: string;
  };
}

export function updateProduct(
  payload: UpdateProduct['payload'],
  meta?: UpdateProduct['meta']
): UpdateProduct {
  return {
    type: ActionType.UPDATE_PRODUCT,
    payload,
    meta,
  };
}

export interface DeleteProduct {
  type: ActionType.DELETE_PRODUCT;
  payload: {
    productID: ProductID;
  };
  meta?: {
    id: string;
  };
}

export function deleteProduct(
  payload: DeleteProduct['payload'],
  meta?: DeleteProduct['meta']
): DeleteProduct {
  return {
    type: ActionType.DELETE_PRODUCT,
    payload,
    meta,
  };
}

export interface ProductDeleted {
  type: ActionType.PRODUCT_DELETED;
  payload: {
    productID: ProductID;
  };
  meta?: {
    id: string;
  };
}

export function productDeleted(
  payload: ProductDeleted['payload'],
  meta?: ProductDeleted['meta']
): ProductDeleted {
  return {
    type: ActionType.PRODUCT_DELETED,
    payload,
    meta,
  };
}

export type AnyAction =
  | RequestProducts
  | RequestProduct
  | ReceiveProducts
  | ReceiveProduct
  | CreateProduct
  | UpdateProduct
  | DeleteProduct
  | ProductDeleted;
