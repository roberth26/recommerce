import { keyBy } from 'lodash/fp';
import { delay } from '../utils/fn';
import * as DB from '../utils/db-mock';
import { ProductReviewID, ProductReview } from './types';
import { normalizeProductReview } from './utils';
import { Product, ProductID } from '../products/types';
import { User, UserID } from '../users/types';
import { ProductCategoryID } from '../product-categories/types';

export async function getProductReviews(
  params?:
    | {
        userID?: UserID | null;
        productID?: ProductID | null;
        productSlug?: never;
      }
    | {
        userID?: UserID | null;
        productID?: never;
        productSlug?: Product['slug'] | null;
      }
): Promise<
  | {
      productReviews: Array<ProductReview<ProductID, User>>;
      error?: never;
    }
  | { productReviews?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const [productReviews, products, users] = await Promise.all([
    DB.getAllProductReviews(),
    DB.getAllProducts(),
    DB.getAllUsers(),
  ]);

  const productsByID = keyBy(product => product.id, products);
  const usersByID = keyBy(user => user.id, users);

  const filteredProductReviews = productReviews
    .filter(
      productReview =>
        (params?.userID == null
          ? true
          : productReview.user === params.userID) &&
        (params?.productID == null
          ? true
          : productReview.product === params.productID) &&
        (params?.productSlug == null
          ? true
          : productsByID[productReview.product]?.slug === params.productSlug)
    )
    .map<ProductReview<ProductID, User>>(productReview => ({
      ...productReview,
      user: usersByID[productReview.user],
    }));

  return {
    productReviews: filteredProductReviews,
  };
}

export async function getProductReview(
  productReviewID: ProductReviewID
): Promise<
  | {
      productReview: ProductReview<Product<ProductCategoryID>, User>;
      error?: never;
    }
  | { productReview?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const productReview = await DB.getProductReview(productReviewID);

  if (productReview == null) {
    return {
      error: `ProductReview id=${productReviewID} not found`,
    };
  }

  const [products, user] = await Promise.all([
    DB.getAllProducts(),
    DB.getUser(productReview.user),
  ]);

  if (user == null) {
    return {
      error: `User id=${productReview.user} not found`,
    };
  }

  const productsByID = keyBy(product => product.id, products);

  const productReviewWithProductAndUser: ProductReview<
    Product<ProductCategoryID>,
    User
  > = {
    ...productReview,
    product: productsByID[productReview.product],
    user,
  };

  return {
    productReview: productReviewWithProductAndUser,
  };
}

export async function createProductReview(
  productReview: ProductReview
): Promise<
  | { productReview: ProductReview<ProductID, UserID>; error?: never }
  | { productReview?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const prodReview = normalizeProductReview(productReview);
  await DB.putProductReview(prodReview);

  return {
    productReview: prodReview,
  };
}

export async function deleteProductReview(
  productReviewID: ProductReviewID
): Promise<{ error?: never } | { error: string }> {
  await delay(Math.random() * 2000 + 500);

  await DB.deleteProductReview(productReviewID);

  return {};
}

export async function updateProductReview(
  productReview: ProductReview
): Promise<
  | { productReview: ProductReview<ProductID, UserID>; error?: never }
  | { productReview?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const prodReview = normalizeProductReview(productReview);
  await DB.putProductReview(prodReview);

  return {
    productReview: prodReview,
  };
}
