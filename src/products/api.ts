import { keyBy } from 'lodash/fp';
import { delay } from '../utils/fn';
import * as DB from '../utils/db-mock';
import {
  ProductCategoryID,
  ProductCategory,
} from '../product-categories/types';
import { ProductID, Product } from './types';
import { normalizeProduct } from './utils';

export async function getProducts(
  params?:
    | {
        productCategoryID: ProductCategoryID;
        productCategorySlug?: never;
      }
    | {
        productCategoryID?: never;
        productCategorySlug: ProductCategory['slug'];
      }
): Promise<
  | { products: Array<Product<ProductCategory>>; error?: never }
  | { products?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const [products, productCategories] = await Promise.all([
    DB.getAllProducts(),
    DB.getAllProductCategories(),
  ]);

  const productCategoriesByID = keyBy(
    productCategory => productCategory.id,
    productCategories
  );

  const filteredProducts = (products as Product<ProductCategoryID>[])
    .filter((product: Product<ProductCategoryID>) =>
      params?.productCategoryID != null
        ? product.category === params.productCategoryID
        : params?.productCategorySlug != null
        ? productCategoriesByID[product.category ?? '']?.slug ===
          params.productCategorySlug
        : true
    )
    .map<Product<ProductCategory>>(product => ({
      ...product,
      category:
        product.category == null
          ? null
          : productCategoriesByID[product.category],
    }));

  return {
    products: filteredProducts,
  };
}

export async function getProduct(
  params:
    | {
        productID: ProductID;
        productSlug?: never;
      }
    | {
        productID?: never;
        productSlug: Product['slug'];
      }
): Promise<
  | { product: Product<ProductCategory>; error?: never }
  | { product?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const product =
    params.productID != null
      ? await DB.getProduct(params.productID)
      : await DB.getAllProducts().then(products =>
          products.find(product => product.slug === params.productSlug)
        );

  if (product == null) {
    return {
      error:
        params.productID != null
          ? `Product id=${params.productID} not found`
          : `Product slug=${params.productSlug} not found`,
    };
  }

  const productCategory =
    product.category == null
      ? null
      : await DB.getProductCategory(product.category);

  if (product.category != null && productCategory == null) {
    return {
      error: `ProductCategory id=${product.category} not found`,
    };
  }

  const productWithCategory: Product<ProductCategory> = {
    ...product,
    category: productCategory,
  };

  return {
    product: productWithCategory,
  };
}

export async function createProduct(
  product: Product
): Promise<
  | { product: Product<ProductCategoryID>; error?: never }
  | { product?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const prod = normalizeProduct(product);
  await DB.putProduct(prod);

  return {
    product: prod,
  };
}

export async function deleteProduct(
  productID: ProductID
): Promise<{ error?: never } | { error: string }> {
  await delay(Math.random() * 2000 + 500);

  await DB.deleteProduct(productID);

  await Promise.all([
    // remove Product from Orders
    DB.getAllOrders().then(orders =>
      Promise.all(
        orders
          .filter(order => order.products.some(prodID => prodID === productID))
          .map(order =>
            DB.putOrder({
              ...order,
              products: order.products.filter(prodID => prodID !== productID),
            })
          )
      )
    ),
    // Remove Product's ProductReviews
    DB.getAllProductReviews().then(productReviews =>
      Promise.all(
        productReviews
          .filter(productReview => productReview.product === productID)
          .map(productReview => DB.deleteProductReview(productReview.id))
      )
    ),
  ]);

  return {};
}

export async function updateProduct(
  product: Product
): Promise<
  | { product: Product<ProductCategoryID>; error?: never }
  | { product?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const prod = normalizeProduct(product);
  await DB.putProduct(prod);

  return {
    product: prod,
  };
}
