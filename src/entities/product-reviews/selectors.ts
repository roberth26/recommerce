import { createSelector } from 'reselect';
import { pipe, map, compact, sortBy } from 'lodash/fp';
import { UserID } from '../users/types';
import { State, ProductReviewID } from './types';
import { ProductID } from '../products/types';

export const byID = (state: State) => state.byID;
export const allIDs = (state: State) => state.allIDs;
export const idsByUserID = (state: State) => state.idsByUserID;
export const idsByProductID = (state: State) => state.idsByProductID;

// public
export const getProductReviewIDs = allIDs;

export const getProductReviews = createSelector(
  [allIDs, byID],
  (allIDs, byID) =>
    pipe(
      map((id: ProductReviewID) => byID[id]),
      compact,
      sortBy(productReview => productReview.createdAt)
    )(allIDs)
);

export const getProductReviewByID = (
  state: State,
  productReviewID: ProductReviewID | undefined | null
) => (productReviewID && byID(state)[productReviewID]) || null;

export const getProductReviewIDsByUserID = (
  state: State,
  userID: UserID | undefined | null
) => (userID && idsByUserID(state)[userID]) || [];

export const getProductReviewIDsByProductID = (
  state: State,
  productID: ProductID | undefined | null
) => (productID && idsByProductID(state)[productID]) || [];
