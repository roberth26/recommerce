import { UserID, User } from '../users/types';
import { ProductID, Product } from '../products/types';

export type ProductReviewID = string;

export type ProductReviewProduct = ProductID | Product;

export type ProductReviewUser = UserID | User;

export type ProductReview<
  TProductReviewProduct extends ProductReviewProduct = ProductReviewProduct,
  TProductReviewUser extends ProductReviewUser = ProductReviewUser
> = {
  id: ProductReviewID;
  rating: number;
  createdAt: string;
  body: string;
  product: TProductReviewProduct;
  user: TProductReviewUser;
};

export type State = {
  byID: Partial<Record<ProductReviewID, ProductReview<ProductID, UserID>>>;
  allIDs: Array<ProductReviewID>;
  idsByUserID: Partial<Record<UserID, Array<ProductReviewID>>>;
  idsByProductID: Partial<Record<ProductID, Array<ProductReviewID>>>;
};
