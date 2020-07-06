import { of, EMPTY, concat, merge } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { ReceivedActionMeta } from 'redux-first-router';
import { flatMap } from 'lodash/fp';
import { ActionType as RoutesActionType } from '../routes/actions';
import {
  requestProducts,
  requestProduct,
  receiveProducts,
  ActionType as ProductsActionType,
  ReceiveProduct,
  ReceiveProducts,
  ProductDeleted,
} from '../entities/products/actions';
import {
  requestOrders,
  requestOrder,
  ActionType as OrdersActionType,
  ReceiveOrder,
  ReceiveOrders,
  OrderDeleted,
} from '../entities/orders/actions';
import {
  requestUsers,
  requestUser,
  receiveUsers,
  ActionType as UsersActionType,
  UserDeleted,
} from '../entities/users/actions';
import {
  requestProductCategories,
  receiveProductCategories,
  ActionType as ProductCategoriesActionType,
  ProductCategoryDeleted,
} from '../entities/product-categories/actions';
import {
  requestProductReviews,
  ActionType as ProductReviewsActionType,
  ReceiveProductReview,
  ReceiveProductReviews,
} from '../entities/product-reviews/actions';
import { User } from '../entities/users/types';
import { Product } from '../entities/products/types';
import { ProductCategory } from '../entities/product-categories/types';

export const productsRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.PRODUCTS),
    mergeMap(({ meta }: ReceivedActionMeta) =>
      merge(
        of(
          requestProducts({
            productCategoryID: meta?.query?.productCategoryID,
          }),
          requestProductCategories()
        ),
        action$.pipe(
          ofType(ProductCategoriesActionType.PRODUCT_CATEGORY_DELETED),
          take(1),
          mergeMap(
            ({
              payload: { productCategoryID: deletedProductCategoryID },
            }: ProductCategoryDeleted) =>
              deletedProductCategoryID === meta?.query?.productCategoryID
                ? of({ type: RoutesActionType.PRODUCTS })
                : EMPTY
          )
        )
      )
    )
  );

export const productRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.PRODUCT),
    mergeMap(({ payload: { productID } }: ReceivedActionMeta) =>
      merge(
        of(requestProduct({ productID }), requestProductReviews({ productID })),
        action$.pipe(
          ofType(ProductsActionType.PRODUCT_DELETED),
          take(1),
          mergeMap(
            ({ payload: { productID: deletedProductID } }: ProductDeleted) =>
              deletedProductID === productID
                ? of({ type: RoutesActionType.PRODUCTS })
                : EMPTY
          )
        )
      )
    )
  );

export const productEditRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.PRODUCT_EDIT),
    mergeMap(({ payload: { productID } }: ReceivedActionMeta) =>
      of(requestProduct({ productID }), requestProductCategories())
    )
  );

export const productCreateRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.PRODUCT_CREATE),
    map((action: ReceivedActionMeta) => requestProductCategories())
  );

export const ordersRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.ORDERS),
    map(() => requestOrders())
  );

export const orderRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.ORDER),
    mergeMap(({ payload: { orderID } }: ReceivedActionMeta) =>
      merge(
        of(requestOrder({ orderID })),
        action$.pipe(
          ofType(OrdersActionType.ORDER_DELETED),
          take(1),
          mergeMap(({ payload: { orderID: deletedOrderID } }: OrderDeleted) =>
            deletedOrderID === orderID
              ? of({ type: RoutesActionType.ORDERS })
              : EMPTY
          )
        )
      )
    )
  );

export const usersRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.USERS),
    map(() => requestUsers())
  );

export const userRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.USER),
    mergeMap(({ payload: { userID } }: ReceivedActionMeta) =>
      merge(
        of(
          requestUser({ userID }),
          requestOrders({ userID }),
          requestProductReviews({ userID })
        ),
        action$.pipe(
          ofType(UsersActionType.USER_DELETED),
          take(1),
          mergeMap(({ payload: { userID: deletedUserID } }: UserDeleted) =>
            deletedUserID === userID
              ? of({ type: RoutesActionType.USERS })
              : EMPTY
          )
        )
      )
    )
  );

// store related entities when receiving denormalized ProductReviews
export const productReviewsEpic: Epic = action$ =>
  action$.pipe(
    ofType(
      ProductReviewsActionType.RECEIVE_PRODUCT_REVIEW,
      ProductReviewsActionType.RECEIVE_PRODUCT_REVIEWS
    ),
    mergeMap((action: ReceiveProductReview | ReceiveProductReviews) => {
      const users = (action.type ===
      ProductReviewsActionType.RECEIVE_PRODUCT_REVIEW
        ? [action.payload.productReview]
        : action.payload.productReviews
      )
        .map(productReview => productReview.user)
        .filter(
          (userOrUserID): userOrUserID is User =>
            typeof userOrUserID !== 'string'
        );

      const products = (action.type ===
      ProductReviewsActionType.RECEIVE_PRODUCT_REVIEW
        ? [action.payload.productReview]
        : action.payload.productReviews
      )
        .map(productReview => productReview.product)
        .filter(
          (productOrProductID): productOrProductID is Product =>
            typeof productOrProductID !== 'string'
        );

      return concat(
        users.length === 0
          ? EMPTY
          : of(
              receiveUsers({
                users,
              })
            ),
        products.length === 0
          ? EMPTY
          : of(
              receiveProducts({
                products,
              })
            )
      );
    })
  );

// store related entities when receiving denormalized Products
export const productsEpic: Epic = action$ =>
  action$.pipe(
    ofType(
      ProductsActionType.RECEIVE_PRODUCT,
      ProductsActionType.RECEIVE_PRODUCTS
    ),
    mergeMap((action: ReceiveProduct | ReceiveProducts) => {
      const productCategories = (action.type ===
      ProductsActionType.RECEIVE_PRODUCT
        ? [action.payload.product]
        : action.payload.products
      )
        .map(product => product.category)
        .filter(
          (
            productCategoryOrProductCategoryID
          ): productCategoryOrProductCategoryID is ProductCategory =>
            productCategoryOrProductCategoryID != null &&
            typeof productCategoryOrProductCategoryID !== 'string'
        );

      return productCategories.length === 0
        ? EMPTY
        : of(
            receiveProductCategories({
              productCategories,
            })
          );
    })
  );

// store related entities when receiving denormalized Products
export const ordersEpic: Epic = action$ =>
  action$.pipe(
    ofType(OrdersActionType.RECEIVE_ORDER, OrdersActionType.RECEIVE_ORDERS),
    mergeMap((action: ReceiveOrder | ReceiveOrders) => {
      const products = (action.type === OrdersActionType.RECEIVE_ORDER
        ? action.payload.order.products
        : flatMap(order => order.products, action.payload.orders)
      ).filter(
        (productOrProductID): productOrProductID is Product =>
          typeof productOrProductID !== 'string'
      );

      const users = (action.type === OrdersActionType.RECEIVE_ORDER
        ? [action.payload.order.user]
        : action.payload.orders.flatMap(order => order.user)
      ).filter(
        (userOrUserID): userOrUserID is User => typeof userOrUserID !== 'string'
      );

      return concat(
        products.length === 0
          ? EMPTY
          : of(
              receiveProducts({
                products,
              })
            ),
        users.length === 0
          ? EMPTY
          : of(
              receiveUsers({
                users,
              })
            )
      );
    })
  );

export const epic = combineEpics(
  productsRouteEpic,
  productRouteEpic,
  productEditRouteEpic,
  productCreateRouteEpic,
  ordersRouteEpic,
  orderRouteEpic,
  usersRouteEpic,
  userRouteEpic,
  productReviewsEpic,
  productsEpic,
  ordersEpic
);
