import { UserID, User } from '../users/types';
import { ProductID, Product } from '../products/types';
import {
  ProductCategoryID,
  ProductCategory,
} from '../product-categories/types';

export type ProductReviewID = string;

export type ProductReview<
  TProduct extends ProductID | Product<ProductCategoryID | ProductCategory> =
    | ProductID
    | Product<ProductCategoryID | ProductCategory>,
  TUser extends UserID | User = UserID | User
> = {
  id: ProductReviewID;
  rating: number;
  createdAt: string;
  body: string;
  product: TProduct;
  user: TUser;
};

export type State = {
  byID: Partial<Record<ProductReviewID, ProductReview<ProductID, UserID>>>;
  allIDs: Array<ProductReviewID>;
  idsByUserID: Partial<Record<UserID, Array<ProductReviewID>>>;
  idsByProductID: Partial<Record<ProductID, Array<ProductReviewID>>>;
};
