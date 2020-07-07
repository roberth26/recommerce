import { Reducer } from 'redux';
import {
  pipe,
  map,
  uniq,
  omit,
  without,
  keyBy,
  concat,
  filter,
  values,
  mapValues,
  groupBy,
} from 'lodash/fp';
import { State, ProductReview } from './types';
import { AnyAction, ActionType } from './actions';
import { initialState } from './constants';
import { normalizeProductReview } from './utils';
import { ProductID } from '../products/types';
import { ProductDeleted } from '../products/actions';
import { UserID } from '../users/types';

export const reducer: Reducer<State, AnyAction | ProductDeleted> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.CREATE_PRODUCT_REVIEW:
    case ActionType.RECEIVE_PRODUCT_REVIEW:
    case ActionType.UPDATE_PRODUCT_REVIEW: {
      const {
        payload: { productReview },
      } = action;
      const productReviewNormalized = normalizeProductReview(productReview);

      if (
        action.type === ActionType.UPDATE_PRODUCT_REVIEW &&
        state.byID[productReviewNormalized.id] == null
      ) {
        return state;
      }

      const byID: typeof state['byID'] = {
        ...state.byID,
        [productReviewNormalized.id]: productReviewNormalized,
      };

      const idsByProductID: typeof state['idsByProductID'] = pipe(
        values,
        groupBy<ProductReview<ProductID, UserID>>(
          productReview => productReview.product
        ),
        mapValues(map(productReview => productReview.id))
      )(byID);

      const idsByUserID: typeof state['idsByUserID'] = pipe(
        values,
        groupBy<ProductReview<ProductID, UserID>>(
          productReview => productReview.user
        ),
        mapValues(map(productReview => productReview.id))
      )(byID);

      return {
        ...state,
        byID,
        idsByProductID,
        idsByUserID,
      };
    }

    case ActionType.DELETE_PRODUCT_REVIEW: {
      const {
        payload: { productReviewID },
      } = action;
      const prevProductReview = state.byID[productReviewID];

      if (prevProductReview == null) {
        return state;
      }

      const prevProductReviewIDsForUserID =
        state.idsByUserID[prevProductReview.user];
      const prevProductReviewIDsForProductID =
        state.idsByProductID[prevProductReview.product];

      return {
        ...state,
        byID: omit(productReviewID, state.byID),
        allIDs: without([productReviewID], state.allIDs),
        idsByUserID:
          prevProductReviewIDsForUserID == null
            ? state.idsByUserID
            : {
                ...state.idsByUserID,
                [prevProductReview.user]: without(
                  [productReviewID],
                  prevProductReviewIDsForUserID
                ),
              },
        idsByProductID:
          prevProductReviewIDsForProductID == null
            ? state.idsByProductID
            : {
                ...state.idsByProductID,
                [prevProductReview.product]: without(
                  [productReviewID],
                  prevProductReviewIDsForProductID
                ),
              },
      };
    }

    case ActionType.RECEIVE_PRODUCT_REVIEWS: {
      const {
        payload: { productReviews },
      } = action;
      const productReviewsNormalized = productReviews.map(
        normalizeProductReview
      );

      return {
        ...state,
        byID: {
          ...state.byID,
          ...keyBy(productReview => productReview.id, productReviewsNormalized),
        },
        allIDs: pipe(
          map(
            (productReview: ProductReview<ProductID, UserID>) =>
              productReview.id
          ),
          concat(state.allIDs),
          uniq
        )(productReviewsNormalized),
        idsByUserID: productReviewsNormalized.reduce((acc, curr) => {
          acc[curr.user] = uniq([...(acc[curr.user] || []), curr.id]);

          return acc;
        }, state.idsByUserID),
        idsByProductID: productReviewsNormalized.reduce((acc, curr) => {
          acc[curr.product] = uniq([...(acc[curr.product] || []), curr.id]);

          return acc;
        }, state.idsByProductID),
      };
    }

    case ActionType.DELETE_PRODUCT_REVIEWS: {
      const {
        payload: { productID, productReviewIDs, userID },
      } = action;

      const productReviewIDSet = new Set(productReviewIDs);

      const byID = pipe(
        filter<ProductReview<ProductID, UserID>>(
          productReview =>
            (productID != null ? productReview.product !== productID : true) &&
            (productReviewIDs != null
              ? !productReviewIDSet.has(productReview.id)
              : true) &&
            (userID != null ? productReview.user !== userID : true)
        ),
        keyBy(productReview => productReview.id)
      )(state.byID);

      const idsByProductID = pipe(
        values,
        groupBy<ProductReview<ProductID, UserID>>(
          productReview => productReview.product
        ),
        mapValues(map(productReview => productReview.id))
      )(byID);

      const idsByUserID = pipe(
        values,
        groupBy<ProductReview<ProductID, UserID>>(
          productReview => productReview.user
        ),
        mapValues(map(productReview => productReview.id))
      )(byID);

      return {
        ...state,
        byID,
        idsByProductID,
        idsByUserID,
      };
    }

    default:
      return state;
  }
};
