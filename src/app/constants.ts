import { NOT_FOUND } from 'redux-first-router';
import { ActionType as RoutesActionType } from '../routes/actions';
import { ProductPageContainer } from './components/ProductPageContainer';
import { NotFoundPage } from './components/NotFoundPage';
import { ProductsPageContainer } from './components/ProductsPageContainer';
import { UserPageContainer } from './components/UserPageContainer';
import { OrderPageContainer } from './components/OrderPageContainer';
import { OrdersPage } from './components/OrdersPage';
import { UsersPage } from './components/UsersPage';
import { ProductEditPageContainer } from './components/ProductEditPageContainer';
import { ProductCreatePageContainer } from './components/ProductCreatePageContainer';
import { ProductCategoryEditPageContainer } from './components/ProductCategoryEditPageContainer';
import { ProductCategoryCreatePageContainer } from './components/ProductCategoryCreatePageContainer';

export const pages: Record<
  RoutesActionType | typeof NOT_FOUND,
  React.ComponentType
> = {
  [RoutesActionType.PRODUCT_CREATE]: ProductCreatePageContainer,
  [RoutesActionType.PRODUCTS]: ProductsPageContainer,
  [RoutesActionType.PRODUCT]: ProductPageContainer,
  [RoutesActionType.PRODUCT_EDIT]: ProductEditPageContainer,
  [RoutesActionType.PRODUCT_CATEGORY_EDIT]: ProductCategoryEditPageContainer,
  [RoutesActionType.PRODUCT_CATEGORY_CREATE]:
    ProductCategoryCreatePageContainer,
  [RoutesActionType.ORDERS]: OrdersPage,
  [RoutesActionType.ORDER]: OrderPageContainer,
  [RoutesActionType.USERS]: UsersPage,
  [RoutesActionType.USER]: UserPageContainer,
  [NOT_FOUND]: NotFoundPage,
};
