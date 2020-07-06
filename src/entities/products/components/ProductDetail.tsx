import React, { ImgHTMLAttributes } from 'react';
import { Product } from '../types';
import { ProductCategory } from '../../product-categories/types';
import Link from 'redux-first-router-link';
import { ActionType as RoutesActionType } from '../../../routes/actions';

type ProductDetailProps = {
  product: Product<ProductCategory> | undefined | null;
  onProductDelete?: (product: Product<ProductCategory>) => void;
};

export function ProductDetail({
  product,
  onProductDelete,
}: ProductDetailProps) {
  if (product == null) {
    return null;
  }

  return (
    <div>
      <Link
        to={{
          type: RoutesActionType.PRODUCT_EDIT,
          payload: { productID: product.id },
        }}
      >
        Edit
      </Link>
      &nbsp; &nbsp;
      <button
        onClick={() => {
          if (
            window.confirm(`Are you sure you want to delete ${product.name}?`)
          ) {
            onProductDelete?.(product);
          }
        }}
      >
        Delete
      </button>
      <h2>{product.name}</h2>
      <h4>${product.price}</h4>
      <ProductImage src={product.imageURI} />
      <p>{product.description}</p>
      <h2>Category</h2>
      {product.category == null ? (
        <div>None</div>
      ) : (
        <Link
          to={{
            type: RoutesActionType.PRODUCTS,
            meta: { query: { productCategoryID: product.category.id } },
          }}
        >
          {product.category.name}
        </Link>
      )}
    </div>
  );
}

function ProductImage({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img style={{ display: 'inline-block', width: 128 }} alt={alt} {...props} />
  );
}
