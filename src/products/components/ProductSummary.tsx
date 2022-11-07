import React, { BaseHTMLAttributes, ImgHTMLAttributes } from 'react';
import { Product } from '../types';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { StarRating } from '../../utils/StarRating';
import { NavLink } from '../../utils/NavLink';

interface ProductSummaryProps {
  product: Product | undefined | null;
}

export function ProductSummary({ product }: ProductSummaryProps) {
  if (product == null) {
    return null;
  }

  return (
    <article>
      <NavLink
        to={{
          type: RoutesActionType.PRODUCT,
          payload: { productSlug: product.slug },
        }}
      >
        {product.imageURI ? (
          <ProductImage src={product.imageURI} />
        ) : (
          <PlaceholderImage />
        )}
        <Title>{product.name}</Title>
      </NavLink>
      <Meta>
        <div>{`$${product.price}`}</div>
        <StarRating rating={product.rating} />
      </Meta>
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
      style={{
        display: 'block',
        width: 128,
        height: 128,
        objectFit: 'cover',
        objectPosition: 'center',
        marginBottom: 4,
        background: 'lightgrey',
        ...style,
      }}
      alt={alt}
      {...props}
    />
  );
}

function PlaceholderImage({
  style,
  ...props
}: BaseHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        display: 'block',
        width: 128,
        height: 128,
        marginBottom: 4,
        background: 'lightgrey',
        ...style,
      }}
      {...props}
    />
  );
}

function Title({
  style,
  children,
  ...props
}: BaseHTMLAttributes<HTMLHeadElement>) {
  return (
    <h4 style={{ margin: '8px 0', ...style }} {...props}>
      {children}
    </h4>
  );
}

function Meta({
  style,
  children,
  ...props
}: BaseHTMLAttributes<HTMLHeadElement>) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
