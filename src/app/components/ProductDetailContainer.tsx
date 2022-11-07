import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { ProductDetail } from '../../products/components/ProductDetail';
import { State } from '../types';
import {
  getProductByIDDenormalized,
  getProductBySlugDenormalized,
} from '../selectors';
import { Product, ProductID } from '../../products/types';
import { deleteProduct } from '../../products/actions';

type ProductDetailProps = ComponentProps<typeof ProductDetail>;

type ProductDetailContainerStateProps = Pick<ProductDetailProps, 'product'>;

type ProductDetailContainerDispatchProps = Required<
  Pick<ProductDetailProps, 'onProductDelete'>
>;

type ProductDetailContainerOwnProps = Omit<
  ProductDetailProps,
  | keyof ProductDetailContainerStateProps
  | keyof Omit<ProductDetailContainerDispatchProps, 'onProductDelete'>
> &
  (
    | {
        productID: ProductID | undefined | null;
        productSlug?: never;
      }
    | {
        productID?: never;
        productSlug: Product['slug'] | undefined | null;
      }
  );

export const ProductDetailContainer = connect<
  ProductDetailContainerStateProps,
  ProductDetailContainerDispatchProps,
  ProductDetailContainerOwnProps,
  State
>(
  (state, { productID, productSlug }) => ({
    product:
      productID != null
        ? getProductByIDDenormalized(state, productID)
        : getProductBySlugDenormalized(state, productSlug),
  }),
  (dispatch, { onProductDelete }) => ({
    onProductDelete: product => {
      dispatch(deleteProduct({ productID: product.id }));
      onProductDelete?.(product);
    },
  })
)(ProductDetail);
