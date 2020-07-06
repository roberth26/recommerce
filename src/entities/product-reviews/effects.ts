import { from, EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType, Epic, combineEpics } from 'redux-observable';
import {
  ActionType,
  receiveProductReviews,
  RequestProductReview,
  receiveProductReview,
  UpdateProductReview,
  CreateProductReview,
  DeleteProductReview,
  RequestProductReviews,
} from './actions';
import * as API from './api';

export const requestProductReviewsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.REQUEST_PRODUCT_REVIEWS),
    mergeMap(({ payload, meta }: RequestProductReviews) =>
      from(
        API.getProductReviews({
          productID: payload?.productID,
          userID: payload?.userID,
        })
      ).pipe(
        mergeMap(res =>
          res.error == null
            ? of(
                receiveProductReviews(
                  { productReviews: res.productReviews },
                  meta
                )
              )
            : EMPTY
        )
      )
    )
  );

export const requestProductReviewEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.REQUEST_PRODUCT_REVIEW),
    mergeMap(({ payload: { productReviewID }, meta }: RequestProductReview) =>
      from(API.getProductReview(productReviewID)).pipe(
        mergeMap(res =>
          res.error == null
            ? of(
                receiveProductReview({ productReview: res.productReview }, meta)
              )
            : EMPTY
        )
      )
    )
  );

export const createProductReviewsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.CREATE_PRODUCT_REVIEW),
    mergeMap(({ payload: { productReview }, meta }: CreateProductReview) =>
      from(API.createProductReview(productReview)).pipe(
        mergeMap(res =>
          res.error == null
            ? of(
                receiveProductReview({ productReview: res.productReview }, meta)
              )
            : EMPTY
        )
      )
    )
  );

export const updateProductReviewsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.UPDATE_PRODUCT_REVIEW),
    mergeMap(({ payload: { productReview }, meta }: UpdateProductReview) =>
      from(API.updateProductReview(productReview)).pipe(
        mergeMap(res =>
          res.error == null
            ? of(
                receiveProductReview({ productReview: res.productReview }, meta)
              )
            : EMPTY
        )
      )
    )
  );

export const deleteProductReviewsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.DELETE_PRODUCT_REVIEW),
    mergeMap(({ payload: { productReviewID } }: DeleteProductReview) =>
      from(API.deleteProductReview(productReviewID)).pipe(mergeMap(() => EMPTY))
    )
  );

export const epic = combineEpics(
  requestProductReviewsEpic,
  requestProductReviewEpic,
  createProductReviewsEpic,
  updateProductReviewsEpic,
  deleteProductReviewsEpic
);
