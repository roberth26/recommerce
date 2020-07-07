import React from 'react';
import { connect } from 'react-redux';
import { ProductID, Product } from '../../products/types';
import { State } from '../types';
import { getCurrentRouteProductID } from '../selectors';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductEditorContainer } from './ProductEditorContainer';
import { ActionType as RoutesActionType } from '../../routes/actions';

type ProductEditScreenProps = {
  productID: ProductID | undefined | null;
  onProductEdit?: (product: Product) => void;
};

export function ProductEditScreen({
  productID,
  onProductEdit,
}: ProductEditScreenProps) {
  if (productID == null) {
    return null;
  }

  return (
    <Page>
      <FullLayout>
        <h2>Edit Product</h2>
        <ProductEditorContainer
          productID={productID}
          onProductEdit={onProductEdit}
        />
      </FullLayout>
    </Page>
  );
}

type ProductEditScreenContainerStateProps = Pick<
  ProductEditScreenProps,
  'productID'
>;

type ProductEditScreenContainerDispatchProps = Required<
  Pick<ProductEditScreenProps, 'onProductEdit'>
>;

type ProductEditScreenContainerOwnProps = Omit<
  ProductEditScreenProps,
  | keyof ProductEditScreenContainerStateProps
  | keyof ProductEditScreenContainerDispatchProps
>;

export const ProductEditScreenContainer = connect<
  ProductEditScreenContainerStateProps,
  ProductEditScreenContainerDispatchProps,
  ProductEditScreenContainerOwnProps,
  State
>(
  state => ({
    productID: getCurrentRouteProductID(state),
  }),
  dispatch => ({
    onProductEdit: product =>
      dispatch({
        type: RoutesActionType.PRODUCT,
        payload: { productID: product.id },
      }),
  })
)(ProductEditScreen);
