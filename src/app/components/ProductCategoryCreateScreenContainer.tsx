import React from 'react';
import { connect } from 'react-redux';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductCategoryEditorContainer } from './ProductCategoryEditorContainer';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { ProductCategory } from '../../product-categories/types';
import { State } from '../types';

type ProductCategoryCreateScreenProps = {
  onProductCategoryEdit?: (productCategory: ProductCategory) => void;
};

export function ProductCategoryCreateScreen({
  onProductCategoryEdit,
}: ProductCategoryCreateScreenProps) {
  return (
    <Page>
      <FullLayout>
        <h2>Create Category</h2>
        <ProductCategoryEditorContainer
          onProductCategoryEdit={onProductCategoryEdit}
        />
      </FullLayout>
    </Page>
  );
}

type ProductCategoryCreateScreenContainerStateProps = Pick<
  ProductCategoryCreateScreenProps,
  never
>;

type ProductCategoryCreateScreenContainerDispatchProps = Required<
  Pick<ProductCategoryCreateScreenProps, 'onProductCategoryEdit'>
>;

type ProductCategoryCreateScreenContainerOwnProps = Omit<
  ProductCategoryCreateScreenProps,
  | keyof ProductCategoryCreateScreenContainerStateProps
  | keyof ProductCategoryCreateScreenContainerDispatchProps
>;

export const ProductCategoryCreateScreenContainer = connect<
  ProductCategoryCreateScreenContainerStateProps,
  ProductCategoryCreateScreenContainerDispatchProps,
  ProductCategoryCreateScreenContainerOwnProps,
  State
>(null, dispatch => ({
  onProductCategoryEdit: productCategory =>
    dispatch({
      type: RoutesActionType.PRODUCTS,
      meta: { query: { productCategoryID: productCategory.id } },
    }),
}))(ProductCategoryCreateScreen);
