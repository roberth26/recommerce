import { ComponentProps } from 'react';
import { ProductReviewEditor } from '../../product-reviews/components/ProductReviewEditor';
import { ProductReviewID } from '../../product-reviews/types';
import { connect } from 'react-redux';
import { State } from '../types';
import { getProductReviewByID } from '../selectors';
import { updateProductReview } from '../../product-reviews/actions';

type ProductReviewEditorProps = ComponentProps<typeof ProductReviewEditor>;

type ProductReviewEditorContainerStateProps = Pick<
  ProductReviewEditorProps,
  'productReview'
>;

type ProductReviewEditorContainerDispatchProps = Required<
  Pick<ProductReviewEditorProps, 'onProductReviewEdit'>
>;

type ProductReviewEditorContainerOwnProps = Omit<
  ProductReviewEditorProps,
  | keyof ProductReviewEditorContainerStateProps
  | keyof Omit<ProductReviewEditorContainerDispatchProps, 'onProductReviewEdit'>
> & {
  productReviewID: ProductReviewID | undefined | null;
};

export const ProductReviewEditorContainer = connect<
  ProductReviewEditorContainerStateProps,
  ProductReviewEditorContainerDispatchProps,
  ProductReviewEditorContainerOwnProps,
  State
>(
  (state, { productReviewID }) => ({
    productReview: getProductReviewByID(state, productReviewID),
  }),
  (dispatch, { onProductReviewEdit }) => ({
    onProductReviewEdit: productReview => {
      dispatch(updateProductReview({ productReview }));
      onProductReviewEdit?.(productReview);
    },
  })
)(ProductReviewEditor);
