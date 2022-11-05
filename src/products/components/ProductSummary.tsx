import React, { ImgHTMLAttributes } from 'react';
import { Product } from '../types';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { StarRating } from '../../utils/StarRating';
import { NavLink } from '../../utils/NavLink';

type ProductSummaryProps = {
  product: Product | undefined | null;
};

export function ProductSummary({ product }: ProductSummaryProps) {
  if (product == null) {
    return null;
  }

  return (
    <article>
      <div>
        <NavLink
          to={{
            type: RoutesActionType.PRODUCT,
            payload: { productID: product.id },
          }}
        >
          <ProductImage src={product.imageURI} />
          {product.name}
        </NavLink>
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
