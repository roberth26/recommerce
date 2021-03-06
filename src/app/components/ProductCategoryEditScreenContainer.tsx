import React from 'react';
import { connect } from 'react-redux';
import {
  ProductCategoryID,
  ProductCategory,
} from '../../product-categories/types';
import { State } from '../types';
import { getCurrentRouteProductCategoryID } from '../selectors';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductCategoryEditorContainer } from './ProductCategoryEditorContainer';
import { ActionType as RoutesActionType } from '../../routes/actions';

type ProductCategoryEditScreenProps = {
  productCategoryID: ProductCategoryID | undefined | null;
  onProductCategoryEdit?: (productCategory: ProductCategory) => void;
};

export function ProductCategoryEditScreen({
  productCategoryID,
  onProductCategoryEdit,
}: ProductCategoryEditScreenProps) {
  if (productCategoryID == null) {
    return null;
  }

  return (
    <Page>
      <FullLayout>
        <h2>Edit Category</h2>
        <ProductCategoryEditorContainer
          productCategoryID={productCategoryID}
          onProductCategoryEdit={onProductCategoryEdit}
        />
      </FullLayout>
    </Page>
  );
}

type ProductCategoryEditScreenContainerStateProps = Pick<
  ProductCategoryEditScreenProps,
  'productCategoryID'
>;

type ProductCategoryEditScreenContainerDispatchProps = Required<
  Pick<ProductCategoryEditScreenProps, 'onProductCategoryEdit'>
>;

type ProductCategoryEditScreenContainerOwnProps = Omit<
  ProductCategoryEditScreenProps,
  | keyof ProductCategoryEditScreenContainerStateProps
  | keyof ProductCategoryEditScreenContainerDispatchProps
>;

export const ProductCategoryEditScreenContainer = connect<
  ProductCategoryEditScreenContainerStateProps,
  ProductCategoryEditScreenContainerDispatchProps,
  ProductCategoryEditScreenContainerOwnProps,
  State
>(
  state => ({
    productCategoryID: getCurrentRouteProductCategoryID(state),
  }),
  dispatch => ({
    onProductCategoryEdit: productCategory =>
      dispatch({
        type: RoutesActionType.PRODUCTS,
        meta: { query: { productCategoryID: productCategory.id } },
      }),
  })
)(ProductCategoryEditScreen);
