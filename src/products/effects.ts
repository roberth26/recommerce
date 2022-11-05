import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType, Epic, combineEpics } from 'redux-observable';
import {
  ActionType,
  receiveProducts,
  RequestProduct,
  receiveProduct,
  UpdateProduct,
  CreateProduct,
  DeleteProduct,
  RequestProducts,
  productDeleted,
} from './actions';
import * as API from './api';

export const requestProductsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.REQUEST_PRODUCTS),
    mergeMap(({ payload, meta }: RequestProducts) =>
      from(API.getProducts(payload?.productCategoryID)).pipe(
        mergeMap(res =>
          res.error == null
            ? [receiveProducts({ products: res.products }, meta)]
            : []
        )
      )
    )
  );

export const requestProductEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.REQUEST_PRODUCT),
    mergeMap(({ payload: { productID }, meta }: RequestProduct) =>
      from(API.getProduct(productID)).pipe(
        mergeMap(res =>
          res.error == null
            ? [receiveProduct({ product: res.product }, meta)]
            : []
        )
      )
    )
  );

export const createProductsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.CREATE_PRODUCT),
    mergeMap(({ payload: { product }, meta }: CreateProduct) =>
      from(API.createProduct(product)).pipe(
        mergeMap(res =>
          res.error == null
            ? [receiveProduct({ product: res.product }, meta)]
            : []
        )
      )
    )
  );

export const updateProductEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.UPDATE_PRODUCT),
    mergeMap(({ payload: { product }, meta }: UpdateProduct) =>
      from(API.updateProduct(product)).pipe(
        mergeMap(res =>
          res.error == null
            ? [receiveProduct({ product: res.product }, meta)]
            : []
        )
      )
    )
  );

export const deleteProductsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.DELETE_PRODUCT),
    mergeMap(({ payload: { productID }, meta }: DeleteProduct) =>
      from(API.deleteProduct(productID)).pipe(
        mergeMap(res =>
          res.error == null ? [productDeleted({ productID }, meta)] : []
        )
      )
    )
  );

export const epic = combineEpics(
  requestProductsEpic,
  requestProductEpic,
  createProductsEpic,
  updateProductEpic,
  deleteProductsEpic
);
