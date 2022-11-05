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

type ProductCategoryEditPageProps = {
  productCategoryID: ProductCategoryID | undefined | null;
  onProductCategoryEdit?: (productCategory: ProductCategory) => void;
};

export function ProductCategoryEditPage({
  productCategoryID,
  onProductCategoryEdit,
}: ProductCategoryEditPageProps) {
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

type ProductCategoryEditPageContainerStateProps = Pick<
  ProductCategoryEditPageProps,
  'productCategoryID'
>;

type ProductCategoryEditPageContainerDispatchProps = Required<
  Pick<ProductCategoryEditPageProps, 'onProductCategoryEdit'>
>;

type ProductCategoryEditPageContainerOwnProps = Omit<
  ProductCategoryEditPageProps,
  | keyof ProductCategoryEditPageContainerStateProps
  | keyof ProductCategoryEditPageContainerDispatchProps
>;

export const ProductCategoryEditPageContainer = connect<
  ProductCategoryEditPageContainerStateProps,
  ProductCategoryEditPageContainerDispatchProps,
  ProductCategoryEditPageContainerOwnProps,
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
)(ProductCategoryEditPage);
