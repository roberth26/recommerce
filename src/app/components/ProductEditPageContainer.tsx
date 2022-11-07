import React from 'react';
import { connect } from 'react-redux';
import { ProductID, Product } from '../../products/types';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { State } from '../types';
import { getCurrentRouteProductID } from '../selectors';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductEditorContainer } from './ProductEditorContainer';
import { Dispatch } from 'redux';

interface ProductEditPageProps {
  productID: ProductID | undefined | null;
  onProductEdit?: (product: Product) => void;
  onCancel?: (product: Product) => void;
}

export function ProductEditPage({
  productID,
  onProductEdit,
  onCancel,
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
          onCancel={onCancel}
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
  Pick<ProductEditPageProps, never>
> & {
  dispatch: Dispatch;
};

type ProductEditPageContainerOwnProps = Omit<
  ProductEditPageProps,
  | keyof ProductEditPageContainerStateProps
  | keyof ProductEditPageContainerDispatchProps
  | 'onProductEdit'
  | 'onCancel'
>;

type ProductEditPageContainerMergeProps = ProductEditPageContainerStateProps &
  Required<Pick<ProductEditPageProps, 'onCancel'>>;

export const ProductEditPageContainer = connect<
  ProductEditPageContainerStateProps,
  ProductEditPageContainerDispatchProps,
  ProductEditPageContainerOwnProps,
  ProductEditPageContainerMergeProps,
  State
>(
  state => ({
    productID: getCurrentRouteProductID(state),
  }),
  dispatch => ({
    dispatch,
  }),
  (stateProps, { dispatch }) => ({
    ...stateProps,
    onCancel: product => {
      dispatch({
        type: RoutesActionType.PRODUCT,
        payload: {
          productSlug: product.slug,
        },
      });
    },
  })
)(ProductEditPage);
