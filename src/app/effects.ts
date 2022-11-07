import { of, merge } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { ofType, Epic, combineEpics, StateObservable } from 'redux-observable';
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
} from '../products/actions';
import {
  requestOrders,
  requestOrder,
  ActionType as OrdersActionType,
  ReceiveOrder,
  ReceiveOrders,
  OrderDeleted,
  deleteOrders,
} from '../orders/actions';
import {
  requestUsers,
  requestUser,
  receiveUsers,
  ActionType as UsersActionType,
  UserDeleted,
} from '../users/actions';
import {
  requestProductCategories,
  receiveProductCategories,
  ActionType as ProductCategoriesActionType,
  ProductCategoryDeleted,
  requestProductCategory,
  ReceiveProductCategory,
} from '../product-categories/actions';
import {
  requestProductReviews,
  ActionType as ProductReviewsActionType,
  ReceiveProductReview,
  ReceiveProductReviews,
  deleteProductReviews,
} from '../product-reviews/actions';
import { User } from '../users/types';
import { Product } from '../products/types';
import { ProductCategory } from '../product-categories/types';
import { State } from './types';
import { getProductCategoryByID } from './selectors';

export const productsRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.PRODUCTS),
    mergeMap(({ meta }: ReceivedActionMeta) =>
      merge(
        of(
          requestProducts(
            meta?.query?.productCategory != null
              ? {
                  productCategorySlug: meta.query.productCategory,
                }
              : undefined
          ),
          requestProductCategories()
        ),
        action$.pipe(
          ofType(ProductCategoriesActionType.PRODUCT_CATEGORY_DELETED),
          take(1),
          mergeMap(
            ({
              payload: { productCategory: deletedProductCategory },
            }: ProductCategoryDeleted) =>
              deletedProductCategory.slug === meta?.query?.productCategory
                ? [{ type: RoutesActionType.PRODUCTS }]
                : []
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
        of(
          requestProduct({ productID }),
          requestProductReviews({ productID }),
          requestUsers()
        ),
        action$.pipe(
          ofType(ProductsActionType.PRODUCT_DELETED),
          take(1),
          mergeMap(
            ({ payload: { productID: deletedProductID } }: ProductDeleted) =>
              deletedProductID === productID
                ? [{ type: RoutesActionType.PRODUCTS }]
                : []
          )
        )
      )
    )
  );

export const productEditRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.PRODUCT_EDIT),
    mergeMap(({ payload: { productID } }: ReceivedActionMeta) =>
      merge(
        of(requestProduct({ productID }), requestProductCategories()),
        action$.pipe(
          ofType(ProductsActionType.UPDATE_PRODUCT),
          take(1),
          mergeMap(() =>
            action$.pipe(ofType(ProductsActionType.RECEIVE_PRODUCT))
          ),
          take(1),
          map(() => ({
            type: RoutesActionType.PRODUCT,
            payload: { productID },
          }))
        )
      )
    )
  );

export const productCreateRouteEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(RoutesActionType.PRODUCT_CREATE),
    mergeMap(() =>
      merge(
        of(requestProductCategories()),
        action$.pipe(
          ofType(ProductsActionType.CREATE_PRODUCT),
          take(1),
          mergeMap(() =>
            action$.pipe(ofType(ProductsActionType.RECEIVE_PRODUCT))
          ),
          take(1),
          map(
            ({
              payload: {
                product: { category },
              },
            }: ReceiveProduct) => {
              const productCategorySlug = (
                category == null
                  ? null
                  : typeof category === 'string'
                  ? getProductCategoryByID(state$.value, category)
                  : category
              )?.slug;
              return {
                type: RoutesActionType.PRODUCTS,
                ...(productCategorySlug && {
                  meta: {
                    query: {
                      productCategory: productCategorySlug,
                    },
                  },
                }),
              };
            }
          )
        )
      )
    )
  );

export const productCategoryEditRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.PRODUCT_CATEGORY_EDIT),
    mergeMap(({ payload: { productCategoryID } }: ReceivedActionMeta) =>
      merge(
        of(requestProductCategory({ productCategoryID })),
        action$.pipe(
          ofType(ProductCategoriesActionType.UPDATE_PRODUCT_CATEGORY),
          take(1),
          mergeMap(() =>
            action$.pipe(
              ofType(ProductCategoriesActionType.RECEIVE_PRODUCT_CATEGORY)
            )
          ),
          take(1),
          map(({ payload: { productCategory } }: ReceiveProductCategory) => ({
            type: RoutesActionType.PRODUCTS,
            meta: { query: { productCategory: productCategory.slug } },
          }))
        )
      )
    )
  );

export const productCategoryCreateRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.PRODUCT_CATEGORY_CREATE),
    mergeMap(() =>
      merge(
        action$.pipe(
          ofType(ProductCategoriesActionType.CREATE_PRODUCT_CATEGORY),
          take(1),
          mergeMap(() =>
            action$.pipe(
              ofType(ProductCategoriesActionType.RECEIVE_PRODUCT_CATEGORY)
            )
          ),
          take(1),
          map(({ payload: { productCategory } }: ReceiveProductCategory) => ({
            type: RoutesActionType.PRODUCTS,
            meta: { query: { productCategory: productCategory.slug } },
          }))
        )
      )
    )
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
              ? [{ type: RoutesActionType.ORDERS }]
              : []
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
            deletedUserID === userID ? [{ type: RoutesActionType.USERS }] : []
          )
        )
      )
    )
  );

export const productReviewsEpic: Epic = action$ =>
  action$.pipe(
    ofType(
      ProductReviewsActionType.RECEIVE_PRODUCT_REVIEW,
      ProductReviewsActionType.RECEIVE_PRODUCT_REVIEWS
    ),
    // store related entities when receiving denormalized ProductReviews
    mergeMap((action: ReceiveProductReview | ReceiveProductReviews) => {
      const users = (
        action.type === ProductReviewsActionType.RECEIVE_PRODUCT_REVIEW
          ? [action.payload.productReview]
          : action.payload.productReviews
      )
        .map(productReview => productReview.user)
        .filter(
          (userOrUserID): userOrUserID is User =>
            typeof userOrUserID !== 'string'
        );

      const products = (
        action.type === ProductReviewsActionType.RECEIVE_PRODUCT_REVIEW
          ? [action.payload.productReview]
          : action.payload.productReviews
      )
        .map(productReview => productReview.product)
        .filter(
          (productOrProductID): productOrProductID is Product =>
            typeof productOrProductID !== 'string'
        );

      return [
        ...(users.length
          ? [
              receiveUsers({
                users,
              }),
            ]
          : []),
        ...(products.length
          ? [
              receiveProducts({
                products,
              }),
            ]
          : []),
      ];
    })
  );

export const productsEpic: Epic = (action$, state$: StateObservable<State>) =>
  merge(
    action$.pipe(
      ofType(
        ProductsActionType.RECEIVE_PRODUCT,
        ProductsActionType.RECEIVE_PRODUCTS
      ),
      // store related entities when receiving denormalized Products
      mergeMap((action: ReceiveProduct | ReceiveProducts) => {
        const productCategories = (
          action.type === ProductsActionType.RECEIVE_PRODUCT
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

        return productCategories.length
          ? [
              receiveProductCategories({
                productCategories,
              }),
            ]
          : [];
      })
    ),
    action$.pipe(
      ofType(ProductsActionType.PRODUCT_DELETED),
      // remove deleted Product's ProductReviews
      map(({ payload: { productID } }: ProductDeleted) =>
        deleteProductReviews({ productID })
      )
    )
  );

export const usersEpic: Epic = action$ =>
  action$.pipe(
    ofType(UsersActionType.USER_DELETED),
    // remove deleted User's ProductReviews and Orders
    mergeMap(({ payload: { userID } }: UserDeleted) => [
      deleteProductReviews({ userID }),
      deleteOrders({ userID }),
    ])
  );

export const ordersEpic: Epic = action$ =>
  action$.pipe(
    ofType(OrdersActionType.RECEIVE_ORDER, OrdersActionType.RECEIVE_ORDERS),
    // store related entities when receiving denormalized Products
    mergeMap((action: ReceiveOrder | ReceiveOrders) => {
      const products = (
        action.type === OrdersActionType.RECEIVE_ORDER
          ? action.payload.order.products
          : flatMap(order => order.products, action.payload.orders)
      ).filter(
        (productOrProductID): productOrProductID is Product =>
          typeof productOrProductID !== 'string'
      );

      const users = (
        action.type === OrdersActionType.RECEIVE_ORDER
          ? [action.payload.order.user]
          : action.payload.orders.flatMap(order => order.user)
      ).filter(
        (userOrUserID): userOrUserID is User => typeof userOrUserID !== 'string'
      );

      return [
        ...(products.length ? [receiveProducts({ products })] : []),
        ...(users.length ? [receiveUsers({ users })] : []),
      ];
    })
  );

export const epic = combineEpics(
  productsRouteEpic,
  productRouteEpic,
  productEditRouteEpic,
  productCreateRouteEpic,
  productCategoryEditRouteEpic,
  productCategoryCreateRouteEpic,
  ordersRouteEpic,
  orderRouteEpic,
  usersRouteEpic,
  userRouteEpic,
  productReviewsEpic,
  productsEpic,
  usersEpic,
  ordersEpic
);
