import { pipe, compact, map, sortBy } from 'lodash/fp';
import { selectFromRoot } from '../utils/fn';
import * as ProductCategoriesSelectors from '../product-categories/selectors';
import * as ProductReviewsSelectors from '../product-reviews/selectors';
import * as ProductsSelectors from '../products/selectors';
import * as UsersSelectors from '../users/selectors';
import * as OrdersSelectors from '../orders/selectors';
import * as RoutesSelectors from '../routes/selectors';
import { State } from './types';
import { UserID, User } from '../users/types';
import { ProductReview, ProductReviewID } from '../product-reviews/types';
import { Product, ProductID } from '../products/types';
import {
  ProductCategory,
  ProductCategoryID,
} from '../product-categories/types';
import { Order, OrderID } from '../orders/types';
import { pages } from './constants';
import { normalizeProductReview } from '../product-reviews/utils';
import { normalizeProduct } from '../products/utils';
import { normalizeOrder } from '../orders/utils';

export const routes = (state: State) => state.routes;
export const productCategories = (state: State) => state.productCategories;
export const productReviews = (state: State) => state.productReviews;
export const products = (state: State) => state.products;
export const users = (state: State) => state.users;
export const orders = (state: State) => state.orders;

export const getCurrentRoute = selectFromRoot(
  routes,
  RoutesSelectors.getCurrentRoute
);

export const getCurrentPageComponent = (state: State) =>
  pages[getCurrentRoute(state)];

export const getCurrentRouteProductID = selectFromRoot(
  routes,
  RoutesSelectors.getProductID
);

export const getCurrentRouteProductCategoryID = selectFromRoot(
  routes,
  RoutesSelectors.getProductCategoryID
);

export const getCurrentRouteProductCategorySlug = selectFromRoot(
  routes,
  RoutesSelectors.getProductCategorySlug
);

export const getCurrentRouteUserID = selectFromRoot(
  routes,
  RoutesSelectors.getUserID
);

export const getCurrentRouteOrderID = selectFromRoot(
  routes,
  RoutesSelectors.getOrderID
);

// ProductCategory selectors
export const getProductCategories = selectFromRoot(
  productCategories,
  ProductCategoriesSelectors.getProductCategories
);

export const getProductCategoryByID = selectFromRoot(
  productCategories,
  ProductCategoriesSelectors.getProductCategoryByID
);

export const getProductCategoryBySlug = selectFromRoot(
  productCategories,
  ProductCategoriesSelectors.getProductCategoryBySlug
);

// ProductReview selectors
export const getProductReviews = selectFromRoot(
  productReviews,
  ProductReviewsSelectors.getProductReviews
);

export const getProductReviewByID = selectFromRoot(
  productReviews,
  ProductReviewsSelectors.getProductReviewByID
);

export const getProductReviewIDsByUserID = selectFromRoot(
  productReviews,
  ProductReviewsSelectors.getProductReviewIDsByUserID
);

export const getProductReviewIDsByProductID = selectFromRoot(
  productReviews,
  ProductReviewsSelectors.getProductReviewIDsByProductID
);

// Product selectors
export const getProductIDs = selectFromRoot(
  products,
  ProductsSelectors.getProductIDs
);

export const getProducts = selectFromRoot(
  products,
  ProductsSelectors.getProducts
);

export const getProductByID = selectFromRoot(
  products,
  ProductsSelectors.getProductByID
);

export const getProductIDsByProductCategoryID = selectFromRoot(
  products,
  ProductsSelectors.getProductIDsByProductCategoryID
);

// User selectors
export const getUserIDs = selectFromRoot(users, UsersSelectors.getUserIDs);

export const getUsers = selectFromRoot(users, UsersSelectors.getUsers);

export const getUserByID = selectFromRoot(users, UsersSelectors.getUserByID);

// Order selectors
export const getOrderIDs = selectFromRoot(orders, OrdersSelectors.getOrderIDs);

export const getOrders = selectFromRoot(orders, OrdersSelectors.getOrders);

export const getOrderByID = selectFromRoot(
  orders,
  OrdersSelectors.getOrderByID
);

export const getOrderIDsByUserID = selectFromRoot(
  orders,
  OrdersSelectors.getOrderIDsByUserID
);

// Cross-domain selectors
export const denormalizeProductReview = (
  state: State,
  productReview: ProductReview | undefined | null
): ProductReview<Product, User> | null => {
  if (productReview == null) {
    return null;
  }

  const { product: productID, user: userID } =
    normalizeProductReview(productReview);

  const product = getProductByID(state, productID);

  if (product == null) {
    console.warn(`Product id=${productID} not found`);

    return null;
  }

  const user = getUserByID(state, userID);

  if (user == null) {
    console.warn(`User id=${userID} not found`);

    return null;
  }

  return {
    ...productReview,
    user,
    product,
  };
};

export const denormalizeProduct = (
  state: State,
  product: Product | undefined | null
): Product<ProductCategory> | null => {
  if (product == null) {
    return null;
  }

  const { category: productCategoryID } = normalizeProduct(product);

  const category =
    productCategoryID == null
      ? null
      : getProductCategoryByID(state, productCategoryID);

  if (productCategoryID != null && category == null) {
    console.warn(`ProductCategory id=${productCategoryID} not found`);

    return null;
  }

  return {
    ...product,
    category,
  };
};

export const denormalizeOrder = (
  state: State,
  order: Order | undefined | null
): Order<Product<ProductCategoryID>, User> | null => {
  if (order == null) {
    return null;
  }

  const { products: productIDs, user: userID } = normalizeOrder(order);

  const products = productIDs
    .map(productID => getProductByID(state, productID))
    .filter(
      (product): product is Product<ProductCategoryID> => product != null
    );

  const user = getUserByID(state, userID);

  if (user == null) {
    console.warn(`User id=${userID} not found`);

    return null;
  }

  return {
    ...order,
    products,
    user,
  };
};

export const getProductReviewByIDDenormalized = (
  state: State,
  productReviewID: ProductReviewID | undefined | null
) =>
  denormalizeProductReview(state, getProductReviewByID(state, productReviewID));

export const getProductReviewsDenormalized = (state: State) =>
  pipe(
    getProductReviews,
    map(productReview => denormalizeProductReview(state, productReview)),
    compact
  )(state);

export const getProductReviewsByUserIDDenormalized = (
  state: State,
  userID: UserID | undefined | null
) =>
  pipe(
    () => getProductReviewIDsByUserID(state, userID),
    map(productReviewID =>
      getProductReviewByIDDenormalized(state, productReviewID)
    ),
    compact,
    sortBy(productReview => productReview.createdAt)
  )();

export const getProductByIDDenormalized = (
  state: State,
  productID: ProductID | undefined | null
) => denormalizeProduct(state, getProductByID(state, productID));

export const getCurrentProductDenormalized = (state: State) =>
  getProductByIDDenormalized(state, getCurrentRouteProductID(state));

export const getProductsDenormalized = (state: State) =>
  pipe(
    getProducts,
    map(product => denormalizeProduct(state, product)),
    compact
  )(state);

export const getProductsByProductCategoryIDDenormalized = (
  state: State,
  productCategoryID: ProductCategoryID | undefined | null
) =>
  pipe(
    () => getProductIDsByProductCategoryID(state, productCategoryID),
    map(productID => getProductByIDDenormalized(state, productID)),
    compact
  )();

export const getCurrentProductCategory = (state: State) =>
  getProductCategoryBySlug(state, getCurrentRouteProductCategorySlug(state));

export const getOrderByIDDenormalized = (
  state: State,
  orderID: OrderID | undefined | null
) => denormalizeOrder(state, getOrderByID(state, orderID));

export const getOrdersDenormalized = (state: State) =>
  pipe(
    getOrders,
    map(order => denormalizeOrder(state, order)),
    compact
  )(state);

export const getOrdersByUserIDDenormalized = (
  state: State,
  userID: UserID | undefined | null
) =>
  pipe(
    () => getOrderIDsByUserID(state, userID),
    map(orderID => getOrderByIDDenormalized(state, orderID)),
    compact
  )();
