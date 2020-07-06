import { ComponentProps } from 'react';
import { ProductReviewSummary } from '../../product-reviews/components/ProductReviewSummary';
import { connect } from 'react-redux';
import { ProductReviewID } from '../../product-reviews/types';
import { State } from '../types';
import { getProductReviewByIDDenormalized } from '../selectors';
import { deleteProductReview } from '../../product-reviews/actions';

type ProductReviewSummaryProps = ComponentProps<typeof ProductReviewSummary>;

type ProductReviewSummaryStateProps = Pick<
  ProductReviewSummaryProps,
  'productReview'
>;

type ProductReviewSummaryDispatchProps = Required<
  Pick<ProductReviewSummaryProps, 'onProductReviewDelete'>
>;

type ProductReviewSummaryOwnProps = Omit<
  ProductReviewSummaryProps,
  | keyof ProductReviewSummaryStateProps
  | keyof Omit<ProductReviewSummaryDispatchProps, 'onProductReviewDelete'>
> & {
  productReviewID: ProductReviewID;
};

export const ProductReviewSummaryContainer = connect<
  ProductReviewSummaryStateProps,
  ProductReviewSummaryDispatchProps,
  ProductReviewSummaryOwnProps,
  State
>(
  (state, { productReviewID }) => ({
    productReview: getProductReviewByIDDenormalized(state, productReviewID),
  }),
  (dispatch, { onProductReviewDelete }) => ({
    onProductReviewDelete: productReview => {
      onProductReviewDelete?.(productReview);
      dispatch(deleteProductReview({ productReviewID: productReview.id }));
    },
  })
)(ProductReviewSummary);
