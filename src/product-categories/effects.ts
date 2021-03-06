import { from, EMPTY, of } from 'rxjs';
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
            ? of(
                receiveProductCategories(
                  { productCategories: res.productCategories },
                  meta
                )
              )
            : EMPTY
        )
      )
    )
  );

export const requestProductCategoryEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.REQUEST_PRODUCT_CATEGORY),
    mergeMap(
      ({ payload: { productCategoryID }, meta }: RequestProductCategory) =>
        from(API.getProductCategory(productCategoryID)).pipe(
          mergeMap(res =>
            res.error == null
              ? of(
                  receiveProductCategory(
                    { productCategory: res.productCategory },
                    meta
                  )
                )
              : EMPTY
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
            ? of(
                receiveProductCategory(
                  { productCategory: res.productCategory },
                  meta
                )
              )
            : EMPTY
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
            ? of(
                receiveProductCategory(
                  { productCategory: res.productCategory },
                  meta
                )
              )
            : EMPTY
        )
      )
    )
  );

export const deleteProductCategoriesEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.DELETE_PRODUCT_CATEGORY),
    mergeMap(
      ({ payload: { productCategoryID }, meta }: DeleteProductCategory) =>
        from(API.deleteProductCategory(productCategoryID)).pipe(
          mergeMap(res =>
            res.error == null
              ? of(productCategoryDeleted({ productCategoryID }, meta))
              : EMPTY
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
