import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { ProductID } from '../../entities/products/types';
import { State } from '../types';
import { getCurrentRouteProductID } from '../selectors';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductEditorContainer } from './ProductEditorContainer';
import { ActionType as RoutesActionType } from '../../routes/actions';

type ProductEditScreenProps = {
  productID: ProductID | undefined | null;
};

export function ProductEditScreen({ productID }: ProductEditScreenProps) {
  const dispatch = useDispatch();

  if (productID == null) {
    return null;
  }

  return (
    <Page>
      <FullLayout>
        <h2>Edit Product</h2>
        <ProductEditorContainer
          productID={productID}
          onProductEdit={() =>
            dispatch({
              type: RoutesActionType.PRODUCT,
              payload: { productID: productID },
            })
          }
        />
      </FullLayout>
    </Page>
  );
}

type ProductEditScreenContainerStateProps = Pick<
  ProductEditScreenProps,
  'productID'
>;

type ProductEditScreenContainerDispatchProps = {};

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
>(state => ({
  productID: getCurrentRouteProductID(state),
}))(ProductEditScreen);
