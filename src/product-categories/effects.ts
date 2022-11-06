import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType, Epic, combineEpics } from 'redux-observable';
import {
  ActionType,
  receiveProductCategories,
  RequestProductCategory,
  receiveProductCategory,
  UpdateProductCategory,
  CreateProductCategory,
  DeleteProductCategory,
  RequestProductCategories,
  productCategoryDeleted,
} from './actions';
import * as API from './api';

export const requestProductCategoriesEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.REQUEST_PRODUCT_CATEGORIES),
    mergeMap(({ meta }: RequestProductCategories) =>
      from(API.getProductCategories()).pipe(
        mergeMap(res =>
          res.error == null
            ? [
                receiveProductCategories(
                  { productCategories: res.productCategories },
                  meta
                ),
              ]
            : []
        )
      )
    )
  );

export const requestProductCategoryEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.REQUEST_PRODUCT_CATEGORY),
    mergeMap(({ payload: queryParams, meta }: RequestProductCategory) =>
      from(API.getProductCategory(queryParams)).pipe(
        mergeMap(res =>
          res.error == null
            ? [
                receiveProductCategory(
                  { productCategory: res.productCategory },
                  meta
                ),
              ]
            : []
        )
      )
    )
  );

export const createProductCategoriesEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.CREATE_PRODUCT_CATEGORY),
    mergeMap(({ payload: { productCategory }, meta }: CreateProductCategory) =>
      from(API.createProductCategory(productCategory)).pipe(
        mergeMap(res =>
          res.error == null
            ? [
                receiveProductCategory(
                  { productCategory: res.productCategory },
                  meta
                ),
              ]
            : []
        )
      )
    )
  );

export const updateProductCategoriesEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.UPDATE_PRODUCT_CATEGORY),
    mergeMap(({ payload: { productCategory }, meta }: UpdateProductCategory) =>
      from(API.updateProductCategory(productCategory)).pipe(
        mergeMap(res =>
          res.error == null
            ? [
                receiveProductCategory(
                  { productCategory: res.productCategory },
                  meta
                ),
              ]
            : []
        )
      )
    )
  );

export const deleteProductCategoriesEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.DELETE_PRODUCT_CATEGORY),
    mergeMap(({ payload: { productCategory }, meta }: DeleteProductCategory) =>
      from(API.deleteProductCategory(productCategory.id)).pipe(
        mergeMap(res =>
          res.error == null
            ? [productCategoryDeleted({ productCategory }, meta)]
            : []
        )
      )
    )
  );

export const epic = combineEpics(
  requestProductCategoriesEpic,
  requestProductCategoryEpic,
  createProductCategoriesEpic,
  updateProductCategoriesEpic,
  deleteProductCategoriesEpic
);
