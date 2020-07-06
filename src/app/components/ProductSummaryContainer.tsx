import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { ProductSummary } from '../../products/components/ProductSummary';
import { State } from '../types';
import { getProductByIDDenormalized } from '../selectors';
import { ProductID } from '../../products/types';

type ProductSummaryProps = ComponentProps<typeof ProductSummary>;

type ProductSummaryContainerStateProps = Pick<ProductSummaryProps, 'product'>;

type ProductSummaryContainerDispatchProps = {};

type ProductSummaryContainerOwnProps = Omit<
  ProductSummaryProps,
  | keyof ProductSummaryContainerStateProps
  | keyof ProductSummaryContainerDispatchProps
> & {
  productID: ProductID;
};

export const ProductSummaryContainer = connect<
  ProductSummaryContainerStateProps,
  ProductSummaryContainerDispatchProps,
  ProductSummaryContainerOwnProps,
  State
>((state, { productID }) => ({
  product: getProductByIDDenormalized(state, productID),
}))(ProductSummary);
