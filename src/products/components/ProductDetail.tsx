import React, { ImgHTMLAttributes } from 'react';
import { Product } from '../types';
import { ProductCategory } from '../../product-categories/types';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { NavLink } from '../../utils/NavLink';
import { NavButton } from '../../utils/NavButton';

interface ProductDetailProps {
  product: Product<ProductCategory> | undefined | null;
  onProductDelete?: (product: Product<ProductCategory>) => void;
}

export function ProductDetail({
  product,
  onProductDelete,
}: ProductDetailProps) {
  if (product == null) {
    return null;
  }

  return (
    <div>
      <NavButton
        to={{
          type: RoutesActionType.PRODUCT_EDIT,
          payload: { productID: product.id },
        }}
      >
        Edit
      </NavButton>
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
        <NavLink
          to={{
            type: RoutesActionType.PRODUCTS,
            meta: { query: { productCategory: product.category.slug } },
          }}
          isActive={() => false}
        >
          {product.category.name}
        </NavLink>
      )}
    </div>
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
        width: 256,
        height: 256,
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
