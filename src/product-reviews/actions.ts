import { ProductReviewID, ProductReview } from './types';
import { Product, ProductID } from '../products/types';
import { UserID } from '../users/types';

export enum ActionType {
  REQUEST_PRODUCT_REVIEWS = '@@product-reviews/REQUEST_PRODUCT_REVIEWS',
  REQUEST_PRODUCT_REVIEW = '@@product-reviews/REQUEST_PRODUCT_REVIEW',
  RECEIVE_PRODUCT_REVIEWS = '@@product-reviews/RECEIVE_PRODUCT_REVIEWS',
  RECEIVE_PRODUCT_REVIEW = '@@product-reviews/RECEIVE_PRODUCT_REVIEW',
  CREATE_PRODUCT_REVIEW = '@@product-reviews/CREATE_PRODUCT_REVIEW',
  UPDATE_PRODUCT_REVIEW = '@@product-reviews/UPDATE_PRODUCT_REVIEW',
  DELETE_PRODUCT_REVIEW = '@@product-reviews/DELETE_PRODUCT_REVIEW',
  DELETE_PRODUCT_REVIEWS = '@@product-reviews/DELETE_PRODUCT_REVIEWS',
}

export interface RequestProductReviews {
  type: ActionType.REQUEST_PRODUCT_REVIEWS;
  payload?:
    | {
        productID?: ProductID | null;
        productSlug?: never;
        userID?: UserID | null;
      }
    | {
        product?: never;
        productSlug?: Product['slug'] | null;
        userID?: UserID | null;
      };
  meta?: {
    id: string;
  };
}

export function requestProductReviews(
  payload?: RequestProductReviews['payload'],
  meta?: RequestProductReviews['meta']
): RequestProductReviews {
  return {
    type: ActionType.REQUEST_PRODUCT_REVIEWS,
    payload,
    meta,
  };
}

export interface RequestProductReview {
  type: ActionType.REQUEST_PRODUCT_REVIEW;
  payload: {
    productReviewID: ProductReviewID;
  };
  meta?: {
    id: string;
  };
}

export function requestProductReview(
  payload: RequestProductReview['payload'],
  meta?: RequestProductReview['meta']
): RequestProductReview {
  return {
    type: ActionType.REQUEST_PRODUCT_REVIEW,
    payload,
    meta,
  };
}

export interface ReceiveProductReviews {
  type: ActionType.RECEIVE_PRODUCT_REVIEWS;
  payload: {
    productReviews: Array<ProductReview>;
  };
  meta?: {
    id: string;
  };
}

export function receiveProductReviews(
  payload: ReceiveProductReviews['payload'],
  meta?: ReceiveProductReviews['meta']
): ReceiveProductReviews {
  return {
    type: ActionType.RECEIVE_PRODUCT_REVIEWS,
    payload,
    meta,
  };
}

export interface ReceiveProductReview {
  type: ActionType.RECEIVE_PRODUCT_REVIEW;
  payload: {
    productReview: ProductReview;
  };
  meta?: {
    id: string;
  };
}

export function receiveProductReview(
  payload: ReceiveProductReview['payload'],
  meta?: ReceiveProductReview['meta']
): ReceiveProductReview {
  return {
    type: ActionType.RECEIVE_PRODUCT_REVIEW,
    payload,
    meta,
  };
}

export interface CreateProductReview {
  type: ActionType.CREATE_PRODUCT_REVIEW;
  payload: {
    productReview: ProductReview;
  };
  meta?: {
    id: string;
  };
}

export function createProductReview(
  payload: CreateProductReview['payload'],
  meta?: CreateProductReview['meta']
): CreateProductReview {
  return {
    type: ActionType.CREATE_PRODUCT_REVIEW,
    payload,
    meta,
  };
}

export interface UpdateProductReview {
  type: ActionType.UPDATE_PRODUCT_REVIEW;
  payload: {
    productReview: ProductReview;
  };
  meta?: {
    id: string;
  };
}

export function updateProductReview(
  payload: UpdateProductReview['payload'],
  meta?: UpdateProductReview['meta']
): UpdateProductReview {
  return {
    type: ActionType.UPDATE_PRODUCT_REVIEW,
    payload,
    meta,
  };
}

export interface DeleteProductReview {
  type: ActionType.DELETE_PRODUCT_REVIEW;
  payload: {
    productReviewID: ProductReviewID;
  };
  meta?: {
    id: string;
  };
}

export function deleteProductReview(
  payload: DeleteProductReview['payload'],
  meta?: DeleteProductReview['meta']
): DeleteProductReview {
  return {
    type: ActionType.DELETE_PRODUCT_REVIEW,
    payload,
    meta,
  };
}

export interface DeleteProductReviews {
  type: ActionType.DELETE_PRODUCT_REVIEWS;
  payload: {
    productReviewIDs?: Array<ProductReviewID>;
    productID?: ProductID;
    userID?: UserID;
  };
  meta?: {
    id: string;
  };
}

export function deleteProductReviews(
  payload: DeleteProductReviews['payload'],
  meta?: DeleteProductReviews['meta']
): DeleteProductReviews {
  return {
    type: ActionType.DELETE_PRODUCT_REVIEWS,
    payload,
    meta,
  };
}

export type AnyAction =
  | RequestProductReviews
  | RequestProductReview
  | ReceiveProductReviews
  | ReceiveProductReview
  | CreateProductReview
  | UpdateProductReview
  | DeleteProductReview
  | DeleteProductReviews;
