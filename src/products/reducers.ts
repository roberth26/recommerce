import { Reducer } from 'redux';
import {
  pipe,
  map,
  omit,
  without,
  keyBy,
  values,
  groupBy,
  mapValues,
  invert,
} from 'lodash/fp';
import { State, Product, ProductID } from './types';
import { AnyAction, ActionType } from './actions';
import { initialState } from './constants';
import { normalizeProduct } from './utils';
import { ProductCategoryID } from '../product-categories/types';

export const reducer: Reducer<State, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.CREATE_PRODUCT:
    case ActionType.UPDATE_PRODUCT:
    case ActionType.RECEIVE_PRODUCT: {
      const {
        payload: { product },
      } = action;
      const productNormalized = normalizeProduct(product);

      if (
        action.type === ActionType.UPDATE_PRODUCT &&
        state.byID[productNormalized.id] == null
      ) {
        return state;
      }

      const byID: typeof state['byID'] = {
        ...state.byID,
        [productNormalized.id]: productNormalized,
      };

      const allIDs: typeof state['allIDs'] = pipe(
        values,
        map<Product<ProductCategoryID>, ProductID>(product => product.id)
      )(byID);

      const idsByProductCategoryID: typeof state['idsByProductCategoryID'] =
        pipe(
          values,
          groupBy<Product<ProductCategoryID>>(product => product.category),
          mapValues(map(product => product.id))
        )(byID);

      const idsBySlug: typeof state['idsBySlug'] = pipe(
        () => byID,
        mapValues(product => product?.slug),
        invert
      )();

      return {
        ...state,
        byID,
        allIDs,
        idsByProductCategoryID,
        idsBySlug,
      };
    }

    case ActionType.PRODUCT_DELETED: {
      const {
        payload: { productID },
      } = action;
      const prevProduct = state.byID[productID];

      if (prevProduct == null) {
        return state;
      }

      const prevProductIDsForProductCategoryID =
        prevProduct.category == null
          ? null
          : state.idsByProductCategoryID[prevProduct.category];

      return {
        ...state,
        byID: omit(productID, state.byID),
        allIDs: without([productID], state.allIDs),
        idsByProductCategoryID:
          prevProductIDsForProductCategoryID == null ||
          prevProduct.category == null
            ? state.idsByProductCategoryID
            : {
                ...state.idsByProductCategoryID,
                [prevProduct.category]: without(
                  [productID],
                  prevProductIDsForProductCategoryID
                ),
              },
        idsBySlug: omit(prevProduct.slug, state.idsBySlug),
      };
    }

    case ActionType.RECEIVE_PRODUCTS: {
      const {
        payload: { products },
      } = action;
      const productsNormalized = products.map(normalizeProduct);

      const byID: typeof state['byID'] = {
        ...state.byID,
        ...keyBy(product => product.id, productsNormalized),
      };

      const allIDs: typeof state['allIDs'] = pipe(
        () => byID,
        values,
        map<Product<ProductCategoryID>, ProductID>(product => product.id)
      )();

      const idsByProductCategoryID: typeof state['idsByProductCategoryID'] =
        pipe(
          () => byID,
          values,
          groupBy<Product<ProductCategoryID>>(product => product.category),
          mapValues(map(product => product.id))
        )();

      const idsBySlug: typeof state['idsBySlug'] = pipe(
        () => byID,
        mapValues(product => product?.slug),
        invert
      )();

      return {
        ...state,
        byID,
        allIDs,
        idsByProductCategoryID,
        idsBySlug,
      };
    }

    default:
      return state;
  }
};
