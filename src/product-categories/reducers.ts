import { Reducer } from 'redux';
import { pipe, map, uniq, omit, without, keyBy, concat } from 'lodash/fp';
import { State, ProductCategory } from './types';
import { AnyAction, ActionType } from './actions';
import { initialState } from './constants';

export const reducer: Reducer<State, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.CREATE_PRODUCT_CATEGORY:
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.productCategory.id]: action.payload.productCategory,
        },
        allIDs: uniq([...state.allIDs, action.payload.productCategory.id]),
      };

    case ActionType.PRODUCT_CATEGORY_DELETED:
      return {
        ...state,
        byID: omit(action.payload.productCategoryID, state.byID),
        allIDs: without([action.payload.productCategoryID], state.allIDs),
      };

    case ActionType.RECEIVE_PRODUCT_CATEGORIES:
      return {
        ...state,
        byID: {
          ...state.byID,
          ...keyBy(
            productCategory => productCategory.id,
            action.payload.productCategories
          ),
        },
        allIDs: pipe(
          map((productCategory: ProductCategory) => productCategory.id),
          concat(state.allIDs),
          uniq
        )(action.payload.productCategories),
      };

    case ActionType.RECEIVE_PRODUCT_CATEGORY:
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.productCategory.id]: action.payload.productCategory,
        },
        allIDs: uniq([...state.allIDs, action.payload.productCategory.id]),
      };

    case ActionType.UPDATE_PRODUCT_CATEGORY: {
      const prevProductCategory = state.byID[action.payload.productCategory.id];

      if (prevProductCategory == null) {
        return state;
      }

      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.productCategory.id]: {
            ...prevProductCategory,
            ...action.payload.productCategory,
          },
        },
      };
    }

    default:
      return state;
  }
};
