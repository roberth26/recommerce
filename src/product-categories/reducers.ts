import { Reducer } from 'redux';
import {
  pipe,
  map,
  omit,
  without,
  keyBy,
  mapValues,
  invert,
  union,
} from 'lodash/fp';
import { State } from './types';
import { AnyAction, ActionType } from './actions';
import { initialState } from './constants';

export const reducer: Reducer<State, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.CREATE_PRODUCT_CATEGORY:
    case ActionType.UPDATE_PRODUCT_CATEGORY:
    case ActionType.RECEIVE_PRODUCT_CATEGORY:
    case ActionType.RECEIVE_PRODUCT_CATEGORIES: {
      const productCategories =
        action.type === ActionType.RECEIVE_PRODUCT_CATEGORIES
          ? action.payload.productCategories
          : [action.payload.productCategory];
      const byID: State['byID'] = {
        ...state.byID,
        ...keyBy(productCategory => productCategory.id, productCategories),
      };

      return {
        ...state,
        byID,
        idsBySlug: pipe(
          () => byID,
          mapValues(productCategory => productCategory?.slug),
          invert
        )(),
        allIDs: pipe(
          () => productCategories,
          map(productCategory => productCategory.id),
          union(state.allIDs)
        )(),
      };
    }

    case ActionType.PRODUCT_CATEGORY_DELETED: {
      const productCategorySlug =
        state.byID[action.payload.productCategory.id]?.slug;

      if (productCategorySlug == null) {
        return state;
      }

      return {
        ...state,
        byID: omit(action.payload.productCategory.id, state.byID),
        idsBySlug: omit(productCategorySlug, state.idsBySlug),
        allIDs: without([action.payload.productCategory.id], state.allIDs),
      };
    }

    default:
      return state;
  }
};
