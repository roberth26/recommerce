import { Product } from './types';
import { ProductCategoryID } from '../product-categories/types';

export function normalizeProduct(product: Product): Product<ProductCategoryID> {
  return {
    ...product,
    category:
      product.category == null
        ? null
        : typeof product.category === 'string'
        ? product.category
        : product.category.id,
  };
}
