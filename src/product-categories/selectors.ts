import { createSelector } from 'reselect';
import { pipe, map, compact, sortBy } from 'lodash/fp';
import { State, ProductCategoryID, ProductCategory } from './types';

export const byID = (state: State) => state.byID;
export const idsBySlug = (state: State) => state.idsBySlug;
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

export const getProductCategoryBySlug = (
  state: State,
  productCategorySlug: ProductCategory['slug'] | undefined | null
) =>
  (productCategorySlug &&
    getProductCategoryByID(state, idsBySlug(state)[productCategorySlug])) ||
  null;
