import { NOT_FOUND } from 'redux-first-router';
import { Product, ProductID } from '../products/types';
import { OrderID } from '../orders/types';
import { UserID } from '../users/types';
import {
  ProductCategory,
  ProductCategoryID,
} from '../product-categories/types';
import { ActionType } from './actions';

export type State =
  | {
      currentRoute: ActionType.PRODUCTS;
      productID?: never;
      productSlug?: never;
      productCategoryID?: never;
      productCategorySlug?: ProductCategory['slug'];
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.PRODUCT;
      productID?: ProductID;
      productSlug: Product['slug'];
      productCategoryID?: never;
      productCategorySlug?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.PRODUCT_EDIT;
      productID: ProductID;
      productSlug?: never;
      productCategoryID?: never;
      productCategorySlug?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.PRODUCT_CREATE;
      productID?: never;
      productSlug?: never;
      productCategoryID?: never;
      productCategorySlug?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.PRODUCT_CATEGORY_EDIT;
      productID?: never;
      productSlug?: never;
      productCategoryID: ProductCategoryID;
      productCategorySlug?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.PRODUCT_CATEGORY_CREATE;
      productID?: never;
      productSlug?: never;
      productCategoryID?: never;
      productCategorySlug?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.ORDERS;
      productID?: never;
      productSlug?: never;
      productCategoryID?: never;
      productCategorySlug?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.ORDER;
      productID?: never;
      productSlug?: never;
      productCategoryID?: never;
      productCategorySlug?: never;
      orderID: OrderID;
      userID?: never;
    }
  | {
      currentRoute: ActionType.USERS;
      productID?: never;
      productSlug?: never;
      productCategoryID?: never;
      productCategorySlug?: never;
      orderID?: never;
      userID?: never;
    }
  | {
      currentRoute: ActionType.USER;
      productID?: never;
      productSlug?: never;
      productCategoryID?: never;
      productCategorySlug?: never;
      orderID?: never;
      userID: UserID;
    }
  | {
      currentRoute: typeof NOT_FOUND;
      productID?: never;
      productSlug?: never;
      productCategoryID?: never;
      productCategorySlug?: never;
      orderID?: never;
      userID?: never;
    };
