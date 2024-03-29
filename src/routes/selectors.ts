import { State } from './types';

export const currentRoute = (state: State) => state.currentRoute;
export const productID = (state: State) => state.productID;
export const productSlug = (state: State) => state.productSlug;
export const orderID = (state: State) => state.orderID;
export const userID = (state: State) => state.userID;
export const productCategoryID = (state: State) => state.productCategoryID;
export const productCategorySlug = (state: State) => state.productCategorySlug;

// public
export const getCurrentRoute = currentRoute;
export const getProductID = productID;
export const getProductSlug = productSlug;
export const getOrderID = orderID;
export const getUserID = userID;
export const getProductCategoryID = productCategoryID;
export const getProductCategorySlug = productCategorySlug;
