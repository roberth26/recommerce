import React, { HTMLAttributes } from 'react';
import { ProductID } from '../../products/types';
import { ProductSummaryContainer } from './ProductSummaryContainer';
import { connect } from 'react-redux';
import { State } from '../types';
import { getProductIDsByProductCategoryID, getProductIDs } from '../selectors';
import { ProductCategoryID } from '../../product-categories/types';

type ProductListProps = {
  productIDs: Array<ProductID>;
};

export function ProductList({ productIDs }: ProductListProps) {
  return (
    <Root>
      {productIDs.map(productID => (
        <li key={productID}>
          <ProductSummaryContainer productID={productID} />
        </li>
      ))}
    </Root>
  );
}

type ProductListContainerStateProps = Pick<ProductListProps, 'productIDs'>;

type ProductListContainerDispatchProps = {};

type ProductListContainerOwnProps = Omit<
  ProductListProps,
  keyof ProductListContainerStateProps | keyof ProductListContainerDispatchProps
> & {
  productCategoryID?: ProductCategoryID | null;
};

export const ProductListContainer = connect<
  ProductListContainerStateProps,
  ProductListContainerDispatchProps,
  ProductListContainerOwnProps,
  State
>((state, { productCategoryID }) => ({
  productIDs:
    productCategoryID != null
      ? getProductIDsByProductCategoryID(state, productCategoryID)
      : getProductIDs(state),
}))(ProductList);

export function Root({ style, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        rowGap: 16,
        listStyle: 'none',
        padding: 0,
        margin: 0,
        ...style,
      }}
      {...props}
    />
  );
}
