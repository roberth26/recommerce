import { NOT_FOUND } from 'redux-first-router';
import { ProductID } from '../entities/products/types';
import { OrderID } from '../entities/orders/types';
import { UserID } from '../entities/users/types';
import { ProductCategoryID } from '../entities/product-categories/types';
import { ActionType } from './actions';

export type State =
  | {
      currentRoute: ActionType.PRODUCTS;
      productID?: never;
      productCategoryID?: ProductCategoryID;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.PRODUCT;
      productID: ProductID;
      productCategoryID?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.PRODUCT_EDIT;
      productID: ProductID;
      productCategoryID?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.PRODUCT_CREATE;
      productID?: never;
      productCategoryID?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.PRODUCT_CATEGORY_EDIT;
      productID?: never;
      productCategoryID: ProductCategoryID;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.PRODUCT_CATEGORY_CREATE;
      productID?: never;
      productCategoryID?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.ORDERS;
      productID?: never;
      productCategoryID?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.ORDER;
      productID?: never;
      productCategoryID?: never;
      orderID: OrderID;
      userID?: never;
    }
  | {
      currentRoute: ActionType.USERS;
      productID?: never;
      productCategoryID?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.USER;
      productID?: never;
      productCategoryID?: never;
      orderID?: never;
      userID: UserID;
    }
  | {
      currentRoute: typeof NOT_FOUND;
      productID?: never;
      productCategoryID?: never;
      orderID?: never;
      userID?: never;
    };
