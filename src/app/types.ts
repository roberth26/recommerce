import { LocationState } from 'redux-first-router';
import { State as ProductCategoriesState } from '../entities/product-categories/types';
import { State as ProductReviewsState } from '../entities/product-reviews/types';
import { State as ProductsState } from '../entities/products/types';
import { State as UsersState } from '../entities/users/types';
import { State as OrdersState } from '../entities/orders/types';
import { State as RoutesState } from '../routes/types';

export type State = {
  productCategories: ProductCategoriesState;
  productReviews: ProductReviewsState;
  products: ProductsState;
  users: UsersState;
  orders: OrdersState;
  routes: RoutesState;
  location: LocationState;
};
