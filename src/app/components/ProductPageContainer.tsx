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

type ProductPageProps = {
  productID: ProductID | undefined | null;
  onProductDelete?: (product: Product<ProductCategory>) => void;
};

export function ProductPage({ productID, onProductDelete }: ProductPageProps) {
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

type ProductPageContainerStateProps = Pick<ProductPageProps, 'productID'>;

type ProductPageContainerDispatchProps = Pick<
  ProductPageProps,
  'onProductDelete'
>;

type ProductPageContainerOwnProps = Omit<
  ProductPageProps,
  keyof ProductPageContainerStateProps | keyof ProductPageContainerDispatchProps
>;

export const ProductPageContainer = connect<
  ProductPageContainerStateProps,
  ProductPageContainerDispatchProps,
  ProductPageContainerOwnProps,
  State
>(state => ({
  productID: getCurrentRouteProductID(state),
}))(ProductPage);
