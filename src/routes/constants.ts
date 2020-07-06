import { connectRoutes } from 'redux-first-router';
import queryString from 'query-string';
import { State } from './types';
import { ActionType } from './actions';

const routeMap: Record<ActionType, string> = {
  [ActionType.PRODUCT]: '/products/:productID',
  [ActionType.PRODUCT_EDIT]: '/products/edit/:productID',
  [ActionType.PRODUCT_CREATE]: '/create',
  [ActionType.PRODUCT_CATEGORY_EDIT]: '/categories/edit/:productCategoryID',
  [ActionType.PRODUCT_CATEGORY_CREATE]: '/categories/create',
  [ActionType.PRODUCTS]: '/',
  [ActionType.ORDER]: '/orders/:orderID',
  [ActionType.ORDERS]: '/orders/',
  [ActionType.USER]: '/users/:userID',
  [ActionType.USERS]: '/users/',
};

export const Location = connectRoutes(routeMap, {
  initialDispatch: false,
  querySerializer: queryString,
});

export const initialState: State = {
  currentRoute: ActionType.PRODUCTS,
};
