import React from 'react';
import { connect } from 'react-redux';
import { ProductID, Product } from '../../products/types';
import { State } from '../types';
import { getCurrentRouteProductID } from '../selectors';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductEditorContainer } from './ProductEditorContainer';
import { ActionType as RoutesActionType } from '../../routes/actions';

type ProductEditPageProps = {
  productID: ProductID | undefined | null;
  onProductEdit?: (product: Product) => void;
};

export function ProductEditPage({
  productID,
  onProductEdit,
}: ProductEditPageProps) {
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

type ProductEditPageContainerStateProps = Pick<
  ProductEditPageProps,
  'productID'
>;

type ProductEditPageContainerDispatchProps = Required<
  Pick<ProductEditPageProps, 'onProductEdit'>
>;

type ProductEditPageContainerOwnProps = Omit<
  ProductEditPageProps,
  | keyof ProductEditPageContainerStateProps
  | keyof ProductEditPageContainerDispatchProps
>;

export const ProductEditPageContainer = connect<
  ProductEditPageContainerStateProps,
  ProductEditPageContainerDispatchProps,
  ProductEditPageContainerOwnProps,
  State
>(
  state => ({
    productID: getCurrentRouteProductID(state),
  }),
  dispatch => ({
    // TODO: handle this in app/effects
    onProductEdit: product =>
      dispatch({
        type: RoutesActionType.PRODUCT,
        payload: { productID: product.id },
      }),
  })
)(ProductEditPage);
