import React from 'react';
import { connect } from 'react-redux';
import { Product } from '../../products/types';
import { State } from '../types';
import { getCurrentRouteProductSlug } from '../selectors';
import { ProductDetailContainer } from './ProductDetailContainer';
import { ProductReviewListContainer } from './ProductReviewListContainer';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductCategory } from '../../product-categories/types';

interface ProductPageProps {
  productSlug: Product['slug'] | undefined | null;
  onProductDelete?: (product: Product<ProductCategory>) => void;
}

export function ProductPage({
  productSlug,
  onProductDelete,
}: ProductPageProps) {
  return (
    <Page>
      <FullLayout>
        <ProductDetailContainer
          productSlug={productSlug}
          onProductDelete={onProductDelete}
        />
        <h2>Reviews</h2>
        <ProductReviewListContainer productSlug={productSlug} />
      </FullLayout>
    </Page>
  );
}

type ProductPageContainerStateProps = Pick<ProductPageProps, 'productSlug'>;

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
  productSlug: getCurrentRouteProductSlug(state),
}))(ProductPage);
