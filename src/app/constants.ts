import { NOT_FOUND } from 'redux-first-router';
import { ActionType as RoutesActionType } from '../routes/actions';
import { ProductScreenContainer } from './components/ProductScreenContainer';
import { NotFoundScreen } from './components/NotFoundScreen';
import { ProductsScreenContainer } from './components/ProductsScreenContainer';
import { UserScreenContainer } from './components/UserScreenContainer';
import { OrderScreenContainer } from './components/OrderScreenContainer';
import { OrdersScreen } from './components/OrdersScreen';
import { UsersScreen } from './components/UsersScreen';
import { ProductEditScreenContainer } from './components/ProductEditScreenContainer';
import { ProductCreateScreenContainer } from './components/ProductCreateScreenContainer';
import { ProductCategoryEditScreenContainer } from './components/ProductCategoryEditScreenContainer';
import { ProductCategoryCreateScreenContainer } from './components/ProductCategoryCreateScreenContainer';

export const screens: Record<
  RoutesActionType | typeof NOT_FOUND,
  React.ComponentType
> = {
  [RoutesActionType.PRODUCT_CREATE]: ProductCreateScreenContainer,
  [RoutesActionType.PRODUCTS]: ProductsScreenContainer,
  [RoutesActionType.PRODUCT]: ProductScreenContainer,
  [RoutesActionType.PRODUCT_EDIT]: ProductEditScreenContainer,
  [RoutesActionType.PRODUCT_CATEGORY_EDIT]: ProductCategoryEditScreenContainer,
  [RoutesActionType.PRODUCT_CATEGORY_CREATE]: ProductCategoryCreateScreenContainer,
  [RoutesActionType.ORDERS]: OrdersScreen,
  [RoutesActionType.ORDER]: OrderScreenContainer,
  [RoutesActionType.USERS]: UsersScreen,
  [RoutesActionType.USER]: UserScreenContainer,
  [NOT_FOUND]: NotFoundScreen,
};
