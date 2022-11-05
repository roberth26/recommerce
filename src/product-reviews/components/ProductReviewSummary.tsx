import React from 'react';
import { ProductReview, ProductReviewProduct } from '../types';
import { User } from '../../users/types';
import { StarRating } from '../../utils/StarRating';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { NavLink } from '../../utils/NavLink';

type ProductReviewSummaryProps = {
  productReview: ProductReview<ProductReviewProduct, User> | undefined | null;
  onProductReviewDelete?: (
    productReview: ProductReview<ProductReviewProduct, User>
  ) => void;
  onEdit?: () => void;
};

export function ProductReviewSummary({
  productReview,
  onProductReviewDelete,
  onEdit,
}: ProductReviewSummaryProps) {
  if (productReview == null) {
    return null;
  }

  return (
    <div>
      <StarRating rating={productReview.rating} />
      <p>{productReview.body}</p>
      <NavLink
        to={{
          type: RoutesActionType.USER,
          payload: { userID: productReview.user.id },
        }}
      >
        {productReview.user.name}
      </NavLink>
      <div>{new Date(productReview.createdAt).toDateString()}</div>
      <button onClick={onEdit}>Edit</button>
      &nbsp;&nbsp;
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
