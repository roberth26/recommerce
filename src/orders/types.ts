import { ProductID, Product } from '../products/types';
import { UserID, User } from '../users/types';

export type OrderID = string;

export type OrderProduct = ProductID | Product;

export type OrderUser = UserID | User;

export type Order<
  TOrderProduct extends OrderProduct = OrderProduct,
  TOrderUser extends OrderUser = OrderUser
> = {
  id: OrderID;
  createdAt: string;
  products: Array<TOrderProduct>;
  totalPrice: number;
  user: TOrderUser;
};

export type State = {
  byID: Partial<Record<OrderID, Order<ProductID, UserID>>>;
  allIDs: Array<OrderID>;
  idsByUserID: Partial<Record<UserID, Array<OrderID>>>;
};
