import React from 'react';
import { connect } from 'react-redux';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductEditorContainer } from './ProductEditorContainer';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { Product } from '../../products/types';
import { State } from '../types';

type ProductCreateScreenProps = {
  onProductEdit?: (product: Product) => void;
};

export function ProductCreateScreen({
  onProductEdit,
}: ProductCreateScreenProps) {
  return (
    <Page>
      <FullLayout>
        <h2>Create Product</h2>
        <ProductEditorContainer onProductEdit={onProductEdit} />
      </FullLayout>
    </Page>
  );
}

type ProductCreateScreenContainerStateProps = Pick<
  ProductCreateScreenProps,
  never
>;

type ProductCreateScreenContainerDispatchProps = Required<
  Pick<ProductCreateScreenProps, 'onProductEdit'>
>;

type ProductCreateScreenContainerOwnPropsProps = Omit<
  ProductCreateScreenProps,
  | keyof ProductCreateScreenContainerStateProps
  | keyof ProductCreateScreenContainerDispatchProps
>;

export const ProductCreateScreenContainer = connect<
  ProductCreateScreenContainerStateProps,
  ProductCreateScreenContainerDispatchProps,
  ProductCreateScreenContainerOwnPropsProps,
  State
>(null, dispatch => ({
  onProductEdit: product => dispatch({ type: RoutesActionType.PRODUCTS }),
}))(ProductCreateScreen);
