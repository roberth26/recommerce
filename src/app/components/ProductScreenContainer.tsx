import React from 'react';
import { connect } from 'react-redux';
import { ProductID, Product } from '../../products/types';
import { State } from '../types';
import { getCurrentRouteProductID } from '../selectors';
import { ProductDetailContainer } from './ProductDetailContainer';
import { ProductReviewListContainer } from './ProductReviewListContainer';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductCategory } from '../../product-categories/types';

type ProductScreenProps = {
  productID: ProductID | undefined | null;
  onProductDelete?: (product: Product<ProductCategory>) => void;
};

export function ProductScreen({
  productID,
  onProductDelete,
}: ProductScreenProps) {
  return (
    <Page>
      <FullLayout>
        <ProductDetailContainer
          productID={productID}
          onProductDelete={onProductDelete}
        />
        <h2>Reviews</h2>
        <ProductReviewListContainer productID={productID} />
      </FullLayout>
    </Page>
  );
}

type ProductScreenContainerStateProps = Pick<ProductScreenProps, 'productID'>;

type ProductScreenContainerDispatchProps = Pick<
  ProductScreenProps,
  'onProductDelete'
>;

type ProductScreenContainerOwnProps = Omit<
  ProductScreenProps,
  | keyof ProductScreenContainerStateProps
  | keyof ProductScreenContainerDispatchProps
>;

export const ProductScreenContainer = connect<
  ProductScreenContainerStateProps,
  ProductScreenContainerDispatchProps,
  ProductScreenContainerOwnProps,
  State
>(state => ({
  productID: getCurrentRouteProductID(state),
}))(ProductScreen);
