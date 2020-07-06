import { createSelector } from 'reselect';
import { pipe, map, compact, sortBy } from 'lodash/fp';
import { State, ProductCategoryID } from './types';

export const byID = (state: State) => state.byID;
export const allIDs = (state: State) => state.allIDs;

// public
export const getProductCategoryIDs = allIDs;

export const getProductCategories = createSelector(
  [allIDs, byID],
  (allIDs, byID) =>
    pipe(
      map((id: ProductCategoryID) => byID[id]),
      compact,
      sortBy(productCategory => productCategory.name)
    )(allIDs)
);

export const getProductCategoryByID = (
  state: State,
  productCategoryID: ProductCategoryID | undefined | null
) => (productCategoryID && byID(state)[productCategoryID]) || null;
