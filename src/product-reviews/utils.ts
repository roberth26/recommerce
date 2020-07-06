import { ProductID } from '../products/types';
import { UserID } from '../users/types';
import { ProductReview } from './types';

export function normalizeProductReview(
  productReview: ProductReview
): ProductReview<ProductID, UserID> {
  return {
    ...productReview,
    product:
      typeof productReview.product === 'string'
        ? productReview.product
        : productReview.product.id,
    user:
      typeof productReview.user === 'string'
        ? productReview.user
        : productReview.user.id,
  };
}
