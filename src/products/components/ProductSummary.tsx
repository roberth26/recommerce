import React, { ImgHTMLAttributes } from 'react';
import Link from 'redux-first-router-link';
import { Product } from '../types';
import {
  ProductCategoryID,
  ProductCategory,
} from '../../product-categories/types';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { StarRating } from '../../utils/StarRating';

type ProductSummaryProps = {
  product: Product<ProductCategoryID | ProductCategory> | undefined | null;
};

export function ProductSummary({ product }: ProductSummaryProps) {
  if (product == null) {
    return null;
  }

  return (
    <article>
      <div>
        <Link
          to={{
            type: RoutesActionType.PRODUCT,
            payload: { productID: product.id },
          }}
        >
          <ProductImage src={product.imageURI} />
          {product.name}
        </Link>
      </div>
      <StarRating rating={product.rating} />
      <div>{`$${product.price}`}</div>
    </article>
  );
}

function ProductImage({
  style,
  alt,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      style={{ display: 'block', width: 128, marginBottom: 8, ...style }}
      alt={alt}
      {...props}
    />
  );
}
