import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { ProductCategoryID } from '../../product-categories/types';
import { State } from '../types';
import { getCurrentRouteProductCategoryID } from '../selectors';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductCategoryEditorContainer } from './ProductCategoryEditorContainer';
import { ActionType as RoutesActionType } from '../../routes/actions';

type ProductCategoryEditScreenProps = {
  productCategoryID: ProductCategoryID | undefined | null;
};

export function ProductCategoryEditScreen({
  productCategoryID,
}: ProductCategoryEditScreenProps) {
  const dispatch = useDispatch();

  if (productCategoryID == null) {
    return null;
  }

  return (
    <Page>
      <FullLayout>
        <h2>Edit Category</h2>
        <ProductCategoryEditorContainer
          productCategoryID={productCategoryID}
          onProductCategoryEdit={() =>
            dispatch({
              type: RoutesActionType.PRODUCTS,
              meta: { query: { productCategoryID } },
            })
          }
        />
      </FullLayout>
    </Page>
  );
}

type ProductCategoryEditScreenContainerStateProps = Pick<
  ProductCategoryEditScreenProps,
  'productCategoryID'
>;

type ProductCategoryEditScreenContainerDispatchProps = {};

type ProductCategoryEditScreenContainerOwnProps = Omit<
  ProductCategoryEditScreenProps,
  | keyof ProductCategoryEditScreenContainerStateProps
  | keyof ProductCategoryEditScreenContainerDispatchProps
>;

export const ProductCategoryEditScreenContainer = connect<
  ProductCategoryEditScreenContainerStateProps,
  ProductCategoryEditScreenContainerDispatchProps,
  ProductCategoryEditScreenContainerOwnProps,
  State
>(state => ({
  productCategoryID: getCurrentRouteProductCategoryID(state),
}))(ProductCategoryEditScreen);
