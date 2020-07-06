import { ProductID, Product } from '../products/types';
import { UserID, User } from '../users/types';
import {
  ProductCategoryID,
  ProductCategory,
} from '../product-categories/types';

export type OrderID = string;

export type Order<
  TProduct extends ProductID | Product<ProductCategoryID | ProductCategory> =
    | ProductID
    | Product<ProductCategoryID | ProductCategory>,
  TUser extends UserID | User = UserID | User
> = {
  id: OrderID;
  createdAt: string;
  products: Array<TProduct>;
  totalPrice: number;
  user: TUser;
};

export type State = {
  byID: Partial<Record<OrderID, Order<ProductID, UserID>>>;
  allIDs: Array<OrderID>;
  idsByUserID: Partial<Record<UserID, Array<OrderID>>>;
};
