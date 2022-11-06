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
  params:
    | {
        productCategoryID: ProductCategoryID;
        productCategorySlug?: never;
      }
    | {
        productCategoryID?: never;
        productCategorySlug: ProductCategory['slug'];
      }
): Promise<
  | { productCategory: ProductCategory; error?: never }
  | { productCategory?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const productCategory =
    params.productCategoryID != null
      ? await DB.getProductCategory(params.productCategoryID)
      : await DB.getAllProductCategories().then(productCategories =>
          productCategories.find(
            productCategory =>
              productCategory.slug === params.productCategorySlug
          )
        );

  if (productCategory == null) {
    return {
      error:
        params.productCategoryID != null
          ? `ProductCategory id=${params.productCategoryID} not found`
          : `ProductCategory slug=${params.productCategorySlug} not found`,
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
