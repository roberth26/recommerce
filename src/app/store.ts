import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { State } from './types';
import { reducer as productCategoriesReducer } from '../entities/product-categories/reducers';
import { epic as productCategoriesEpic } from '../entities/product-categories/effects';
import { reducer as productReviewsReducer } from '../entities/product-reviews/reducers';
import { epic as productReviewsEpic } from '../entities/product-reviews/effects';
import { reducer as productsReducer } from '../entities/products/reducers';
import { epic as productsEpic } from '../entities/products/effects';
import { reducer as usersReducer } from '../entities/users/reducers';
import { epic as usersEpic } from '../entities/users/effects';
import { reducer as ordersReducer } from '../entities/orders/reducers';
import { epic as ordersEpic } from '../entities/orders/effects';
import { reducer as routesReducer } from '../routes/reducers';
import { Location } from '../routes/constants';
import { epic as appEpic } from './effects';

const epicMiddleware = createEpicMiddleware();

const middleware = [epicMiddleware, Location.middleware];

const enhancers = [Location.enhancer, applyMiddleware(...middleware)];

const rootReducer = combineReducers<State>({
  productCategories: productCategoriesReducer,
  productReviews: productReviewsReducer,
  products: productsReducer,
  users: usersReducer,
  orders: ordersReducer,
  routes: routesReducer,
  location: Location.reducer as any, // TODO:
});

const rootEpic = combineEpics(
  appEpic,
  productCategoriesEpic,
  productReviewsEpic,
  productsEpic,
  usersEpic,
  ordersEpic
);

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools({
        name: 'recommerce',
      })
    : compose;

export const store = createStore(rootReducer, composeEnhancers(...enhancers));

epicMiddleware.run(rootEpic);

Location.initialDispatch?.();
