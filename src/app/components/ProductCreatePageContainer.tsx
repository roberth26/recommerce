import React from 'react';
import { connect } from 'react-redux';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { State } from '../types';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductEditorContainer } from './ProductEditorContainer';

interface ProductCreatePageProps {
  onCancel?: () => void;
}

export function ProductCreatePage({ onCancel }: ProductCreatePageProps) {
  return (
    <Page>
      <FullLayout>
        <h2>Create Product</h2>
        <ProductEditorContainer onCancel={onCancel} />
      </FullLayout>
    </Page>
  );
}

type ProductCreatePageContainerStateProps = Pick<ProductCreatePageProps, never>;

type ProductCreatePageContainerDispatchProps = Required<
  Pick<ProductCreatePageProps, 'onCancel'>
>;

type ProductCreatePageContainerOwnProps = Omit<
  ProductCreatePageProps,
  | keyof ProductCreatePageContainerStateProps
  | keyof ProductCreatePageContainerDispatchProps
>;

export const ProductCreatePageContainer = connect<
  ProductCreatePageContainerStateProps,
  ProductCreatePageContainerDispatchProps,
  ProductCreatePageContainerOwnProps,
  State
>(null, dispatch => ({
  onCancel: () => dispatch({ type: RoutesActionType.PRODUCTS }),
}))(ProductCreatePage);
