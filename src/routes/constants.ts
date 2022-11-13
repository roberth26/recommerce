import { connectRoutes } from 'redux-first-router';
import queryString from 'query-string';
import { State } from './types';
import { ActionType } from './actions';

const routeMap: Record<ActionType, string> = {
  [ActionType.PRODUCTS]: '/',
  [ActionType.PRODUCT_CREATE]: '/product/create',
  [ActionType.PRODUCT]: '/product/:productSlug',
  [ActionType.PRODUCT_EDIT]: '/product/:productID/edit',
  [ActionType.PRODUCT_CATEGORY_CREATE]: '/product-category/create',
  [ActionType.PRODUCT_CATEGORY_EDIT]:
    '/product-category/:productCategoryID/edit',
  [ActionType.ORDERS]: '/orders/',
  [ActionType.ORDER]: '/order/:orderID',
  [ActionType.USERS]: '/users/',
  [ActionType.USER]: '/user/:userID',
};

export const Location = connectRoutes(routeMap, {
  initialDispatch: false,
  querySerializer: queryString,
});

export const initialState: State = {
  currentRoute: ActionType.PRODUCTS,
};
