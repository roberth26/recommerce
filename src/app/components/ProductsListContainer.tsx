import React, { HTMLAttributes } from 'react';
import { ProductID } from '../../products/types';
import { ProductSummaryContainer } from './ProductSummaryContainer';
import { connect } from 'react-redux';
import { State } from '../types';
import { getProductIDsByProductCategoryID, getProductIDs } from '../selectors';
import { ProductCategoryID } from '../../product-categories/types';

interface ProductsListProps {
  productIDs: Array<ProductID>;
}

export function ProductsList({ productIDs }: ProductsListProps) {
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

type ProductsListContainerStateProps = Pick<ProductsListProps, 'productIDs'>;

type ProductsListContainerDispatchProps = Pick<ProductsListProps, never>;

type ProductsListContainerOwnProps = Omit<
  ProductsListProps,
  | keyof ProductsListContainerStateProps
  | keyof ProductsListContainerDispatchProps
> & {
  productCategoryID?: ProductCategoryID | null;
};

export const ProductsListContainer = connect<
  ProductsListContainerStateProps,
  ProductsListContainerDispatchProps,
  ProductsListContainerOwnProps,
  State
>((state, { productCategoryID }) => ({
  productIDs:
    productCategoryID != null
      ? getProductIDsByProductCategoryID(state, productCategoryID)
      : getProductIDs(state),
}))(ProductsList);

export function Root({ style, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 24,
        listStyle: 'none',
        padding: 0,
        margin: 0,
        ...style,
      }}
      {...props}
    />
  );
}
