import React from 'react';
import { connect } from 'react-redux';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductCategoryEditorContainer } from './ProductCategoryEditorContainer';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { ProductCategory } from '../../product-categories/types';
import { State } from '../types';

type ProductCategoryCreatePageProps = {
  onProductCategoryEdit?: (productCategory: ProductCategory) => void;
};

export function ProductCategoryCreatePage({
  onProductCategoryEdit,
}: ProductCategoryCreatePageProps) {
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

type ProductCategoryCreatePageContainerStateProps = Pick<
  ProductCategoryCreatePageProps,
  never
>;

type ProductCategoryCreatePageContainerDispatchProps = Required<
  Pick<ProductCategoryCreatePageProps, 'onProductCategoryEdit'>
>;

type ProductCategoryCreatePageContainerOwnProps = Omit<
  ProductCategoryCreatePageProps,
  | keyof ProductCategoryCreatePageContainerStateProps
  | keyof ProductCategoryCreatePageContainerDispatchProps
>;

export const ProductCategoryCreatePageContainer = connect<
  ProductCategoryCreatePageContainerStateProps,
  ProductCategoryCreatePageContainerDispatchProps,
  ProductCategoryCreatePageContainerOwnProps,
  State
>(null, dispatch => ({
  onProductCategoryEdit: productCategory =>
    dispatch({
      type: RoutesActionType.PRODUCTS,
      meta: { query: { productCategoryID: productCategory.id } },
    }),
}))(ProductCategoryCreatePage);
