import { keyBy } from 'lodash/fp';
import { delay } from '../../utils/fn';
import { getDB } from '../../utils/db-mock';
import { ProductReviewID, ProductReview } from './types';
import { normalizeProductReview } from './utils';
import { Product, ProductID } from '../products/types';
import { User, UserID } from '../users/types';
import { ProductCategoryID } from '../product-categories/types';

export async function getProductReviews(params?: {
  userID?: UserID | null;
  productID?: ProductID | null;
}): Promise<
  | {
      productReviews: Array<ProductReview<Product<ProductCategoryID>, User>>;
      error?: never;
    }
  | { productReviews?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const db = await getDB();
  const [productReviews, products, users] = await Promise.all([
    db.getAllProductReviews(),
    db.getAllProducts(),
    db.getAllUsers(),
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
          : productReview.product === params.productID)
    )
    .map<ProductReview<Product<ProductCategoryID>, User>>(productReview => ({
      ...productReview,
      product: productsByID[productReview.product] as Product<
        ProductCategoryID
      >,
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

  const db = await getDB();
  const productReview = await db.getProductReview(productReviewID);

  if (productReview == null) {
    return {
      error: `ProductReview id=${productReviewID} not found`,
    };
  }

  const [products, user] = await Promise.all([
    db.getAllProducts(),
    db.getUser(productReview.user),
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
  const db = await getDB();
  await db.putProductReview(prodReview);

  return {
    productReview: prodReview,
  };
}

export async function deleteProductReview(
  productReviewID: ProductReviewID
): Promise<{ error?: never } | { error: string }> {
  await delay(Math.random() * 2000 + 500);

  const db = await getDB();
  await db.deleteProductReview(productReviewID);

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
  const db = await getDB();
  await db.putProductReview(prodReview);

  return {
    productReview: prodReview,
  };
}
