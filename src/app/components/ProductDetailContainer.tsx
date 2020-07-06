import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { ProductDetail } from '../../entities/products/components/ProductDetail';
import { State } from '../types';
import { getProductByIDDenormalized } from '../selectors';
import { ProductID } from '../../entities/products/types';
import { deleteProduct } from '../../entities/products/actions';

type ProductDetailProps = ComponentProps<typeof ProductDetail>;

type ProductDetailContainerStateProps = Pick<ProductDetailProps, 'product'>;

type ProductDetailContainerDispatchProps = Required<
  Pick<ProductDetailProps, 'onProductDelete'>
>;

type ProductDetailContainerOwnProps = Omit<
  ProductDetailProps,
  | keyof ProductDetailContainerStateProps
  | keyof Omit<ProductDetailContainerDispatchProps, 'onProductDelete'>
> & {
  productID: ProductID | undefined | null;
};

export const ProductDetailContainer = connect<
  ProductDetailContainerStateProps,
  ProductDetailContainerDispatchProps,
  ProductDetailContainerOwnProps,
  State
>(
  (state, { productID }) => ({
    product: getProductByIDDenormalized(state, productID),
  }),
  (dispatch, { onProductDelete }) => ({
    onProductDelete: product => {
      dispatch(deleteProduct({ productID: product.id }));
      onProductDelete?.(product);
    },
  })
)(ProductDetail);
