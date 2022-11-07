import { createSelector } from 'reselect';
import { pipe, map, compact, sortBy } from 'lodash/fp';
import { ProductCategoryID } from '../product-categories/types';
import { State, ProductID, Product } from './types';

const byID = (state: State) => state.byID;
const allIDs = (state: State) => state.allIDs;
const idsByProductCategoryID = (state: State) => state.idsByProductCategoryID;
const idsBySlug = (state: State) => state.idsBySlug;

export const getProductIDs = allIDs;

export const getProducts = createSelector([allIDs, byID], (allIDs, byID) =>
  pipe(
    () => allIDs,
    map((id: ProductID) => byID[id]),
    compact,
    sortBy(product => product.name)
  )()
);

export const getProductByID = (
  state: State,
  productID: ProductID | undefined | null
) => (productID && byID(state)[productID]) || null;

export const getProductIDsByProductCategoryID = (
  state: State,
  productCategoryID: ProductCategoryID | undefined | null
) =>
  (productCategoryID && idsByProductCategoryID(state)[productCategoryID]) || [];

export const getProductIDBySlug = (
  state: State,
  productSlug: Product['slug'] | undefined | null
) => productSlug && idsBySlug(state)[productSlug];
