import { Reducer } from 'redux';
import { NOT_FOUND, ReceivedActionMeta } from 'redux-first-router';
import { State } from './types';
import { initialState } from './constants';
import { ActionType } from './actions';

export const reducer: Reducer<State, ReceivedActionMeta> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.PRODUCTS:
      return {
        currentRoute: action.type,
        productCategoryID: action.meta.query?.productCategoryID,
      };

    case ActionType.PRODUCT:
      return {
        currentRoute: action.type,
        productID: action.payload.productID,
      };

    case ActionType.PRODUCT_EDIT:
      return {
        currentRoute: action.type,
        productID: action.payload.productID,
      };

    case ActionType.PRODUCT_CREATE:
      return {
        currentRoute: action.type,
      };

    case ActionType.PRODUCT_CATEGORY_EDIT:
      return {
        currentRoute: action.type,
        productCategoryID: action.payload.productCategoryID,
      };

    case ActionType.PRODUCT_CATEGORY_CREATE:
      return {
        currentRoute: action.type,
      };

    case ActionType.ORDERS:
      return {
        currentRoute: action.type,
      };

    case ActionType.ORDER:
      return {
        currentRoute: action.type,
        orderID: action.payload.orderID,
      };

    case ActionType.USERS:
      return {
        currentRoute: action.type,
      };

    case ActionType.USER:
      return {
        currentRoute: action.type,
        userID: action.payload.userID,
      };

    case NOT_FOUND:
      return {
        currentRoute: NOT_FOUND,
      };

    default:
      return state;
  }
};
