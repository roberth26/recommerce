import { delay } from '../utils/fn';
import * as DB from '../utils/db-mock';
import { ProductCategoryID, ProductCategory } from './types';

export async function getProductCategories(): Promise<
  | {
      productCategories: Array<ProductCategory>;
      error?: never;
    }
  | { productCategories?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const productCategories = await DB.getAllProductCategories();

  return {
    productCategories,
  };
}

export async function getProductCategory(
  productCategoryID: ProductCategoryID
): Promise<
  | { productCategory: ProductCategory; error?: never }
  | { productCategory?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const productCategory = await DB.getProductCategory(productCategoryID);

  if (productCategory == null) {
    return {
      error: `ProductCategory id=${productCategoryID} not found`,
    };
  }

  return {
    productCategory,
  };
}

export async function createProductCategory(
  productCategory: ProductCategory
): Promise<
  | {
      productCategory: ProductCategory;
      error?: never;
    }
  | { productCategory?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  await DB.putProductCategory(productCategory);

  return {
    productCategory,
  };
}

export async function deleteProductCategory(
  productCategoryID: ProductCategoryID
): Promise<{ error?: never } | { error: string }> {
  await delay(Math.random() * 2000 + 500);

  await DB.deleteProductCategory(productCategoryID);

  // Remove ProductCategory from Products
  const products = await DB.getAllProducts();
  await Promise.all(
    products
      .filter(product => product.category === productCategoryID)
      .map(product => DB.putProduct({ ...product, category: null }))
  );

  return {};
}

export async function updateProductCategory(
  productCategory: ProductCategory
): Promise<
  | {
      productCategory: ProductCategory;
      error?: never;
    }
  | { productCategory?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  await DB.putProductCategory(productCategory);

  return {
    productCategory,
  };
}
