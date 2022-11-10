import { State as ProductCategoriesState } from '../product-categories/types';
import { State as ProductReviewsState } from '../product-reviews/types';
import { State as ProductsState } from '../products/types';
import { State as UsersState } from '../users/types';
import { State as OrdersState } from '../orders/types';
import { State as RoutesState } from '../routes/types';
import { Location } from '../routes/constants';

export interface State {
  productCategories: ProductCategoriesState;
  productReviews: ProductReviewsState;
  products: ProductsState;
  users: UsersState;
  orders: OrdersState;
  routes: RoutesState;
  location: ReturnType<typeof Location['reducer']>;
}
