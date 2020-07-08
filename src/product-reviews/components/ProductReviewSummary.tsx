import React from 'react';
import Link from 'redux-first-router-link';
import { ProductReview, ProductReviewProduct } from '../types';
import { User } from '../../users/types';
import { StarRating } from '../../utils/StarRating';
import { ActionType as RoutesActionType } from '../../routes/actions';

type ProductReviewSummaryProps = {
  productReview: ProductReview<ProductReviewProduct, User> | undefined | null;
  onProductReviewDelete?: (
    productReview: ProductReview<ProductReviewProduct, User>
  ) => void;
};

export function ProductReviewSummary({
  productReview,
  onProductReviewDelete,
}: ProductReviewSummaryProps) {
  if (productReview == null) {
    return null;
  }

  return (
    <div>
      <StarRating rating={productReview.rating} />
      <p>{productReview.body}</p>
      <Link
        to={{
          type: RoutesActionType.USER,
          payload: { userID: productReview.user.id },
        }}
      >
        {productReview.user.name}
      </Link>
      <div>{new Date(productReview.createdAt).toDateString()}</div>
      <button
        onClick={() => {
          if (
            window.confirm(
              `Are you sure you want to delete this product review?`
            )
          ) {
            onProductReviewDelete?.(productReview);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}
