import { delay } from '../utils/fn';
import { getDB } from '../utils/db-mock';
import { ProductCategoryID, ProductCategory } from './types';

export async function getProductCategories(): Promise<
  | {
      productCategories: Array<ProductCategory>;
      error?: never;
    }
  | { productCategories?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const db = await getDB();
  const productCategories = await db.getAllProductCategories();

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

  const db = await getDB();
  const productCategory = await db.getProductCategory(productCategoryID);

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

  const db = await getDB();
  await db.putProductCategory(productCategory);

  return {
    productCategory,
  };
}

export async function deleteProductCategory(
  productCategoryID: ProductCategoryID
): Promise<{ error?: never } | { error: string }> {
  await delay(Math.random() * 2000 + 500);

  const db = await getDB();
  await db.deleteProductCategory(productCategoryID);

  // Remove ProductCategory from Products
  const products = await db.getAllProducts();
  await Promise.all(
    products
      .filter(product => product.category === productCategoryID)
      .map(product => db.putProduct({ ...product, category: null }))
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

  const db = await getDB();
  await db.putProductCategory(productCategory);

  return {
    productCategory,
  };
}
