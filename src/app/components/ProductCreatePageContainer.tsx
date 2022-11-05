import React from 'react';
import { connect } from 'react-redux';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductEditorContainer } from './ProductEditorContainer';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { Product } from '../../products/types';
import { State } from '../types';

type ProductCreatePageProps = {
  onProductEdit?: (product: Product) => void;
};

export function ProductCreatePage({ onProductEdit }: ProductCreatePageProps) {
  return (
    <Page>
      <FullLayout>
        <h2>Create Product</h2>
        <ProductEditorContainer onProductEdit={onProductEdit} />
      </FullLayout>
    </Page>
  );
}

type ProductCreatePageContainerStateProps = Pick<ProductCreatePageProps, never>;

type ProductCreatePageContainerDispatchProps = Required<
  Pick<ProductCreatePageProps, 'onProductEdit'>
>;

type ProductCreatePageContainerOwnPropsProps = Omit<
  ProductCreatePageProps,
  | keyof ProductCreatePageContainerStateProps
  | keyof ProductCreatePageContainerDispatchProps
>;

export const ProductCreatePageContainer = connect<
  ProductCreatePageContainerStateProps,
  ProductCreatePageContainerDispatchProps,
  ProductCreatePageContainerOwnPropsProps,
  State
>(null, dispatch => ({
  onProductEdit: product => dispatch({ type: RoutesActionType.PRODUCTS }),
}))(ProductCreatePage);
