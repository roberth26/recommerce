import {
  createStore,
  applyMiddleware,
  combineReducers,
  StoreEnhancer,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { State } from './types';
import { reducer as productCategoriesReducer } from '../product-categories/reducers';
import { epic as productCategoriesEpic } from '../product-categories/effects';
import { reducer as productReviewsReducer } from '../product-reviews/reducers';
import { epic as productReviewsEpic } from '../product-reviews/effects';
import { reducer as productsReducer } from '../products/reducers';
import { epic as productsEpic } from '../products/effects';
import { reducer as usersReducer } from '../users/reducers';
import { epic as usersEpic } from '../users/effects';
import { reducer as ordersReducer } from '../orders/reducers';
import { epic as ordersEpic } from '../orders/effects';
import { reducer as routesReducer } from '../routes/reducers';
import { Location } from '../routes/constants';
import { epic as appEpic } from './effects';

const epicMiddleware = createEpicMiddleware();

const middleware = [epicMiddleware, Location.middleware];

const performanceEnhancer: StoreEnhancer =
  createStore =>
  (...args) => {
    const store = createStore(...args);
    let prevState = store.getState();
    return {
      ...store,
      dispatch: action => {
        prevState = store.getState();
        store.dispatch(action);
        return action;
      },
      subscribe: subscriber => {
        return store.subscribe(() => {
          const newState = store.getState();
          const hasStateChanged = newState !== prevState;
          if (hasStateChanged) {
            subscriber();
          }
        });
      },
    };
  };

const enhancers = [
  Location.enhancer,
  applyMiddleware(...middleware),
  performanceEnhancer,
];

const rootReducer = combineReducers<State>({
  productCategories: productCategoriesReducer,
  productReviews: productReviewsReducer,
  products: productsReducer,
  users: usersReducer,
  orders: ordersReducer,
  routes: routesReducer,
  location: Location.reducer,
});

const rootEpic = combineEpics(
  appEpic,
  productCategoriesEpic,
  productReviewsEpic,
  productsEpic,
  usersEpic,
  ordersEpic
);

const composeEnhancers = composeWithDevTools({
  name: 'recommerce',
});

export const store = createStore(rootReducer, composeEnhancers(...enhancers));

epicMiddleware.run(rootEpic);

Location.initialDispatch?.();
