import React, { HTMLAttributes } from 'react';
import Link from 'redux-first-router-link';
import { pipe, groupBy, entries } from 'lodash/fp';
import { Order } from '../types';
import { Product } from '../../products/types';
import { User } from '../../users/types';
import { ProductCategoryID } from '../../product-categories/types';
import { ProductSummary } from '../../products/components/ProductSummary';
import { ActionType as RoutesActionType } from '../../routes/actions';

type OrderDetailProps = {
  order: Order<Product<ProductCategoryID>, User> | undefined | null;
  onOrderDelete?: (order: Order<Product<ProductCategoryID>, User>) => void;
};

export function OrderDetail({ order, onOrderDelete }: OrderDetailProps) {
  if (order == null) {
    return null;
  }

  const productsGrouped = pipe(
    groupBy((product: Product<ProductCategoryID>) => product.id),
    dict => entries(dict)
  )(order.products);

  return (
    <article>
      <button
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this order?')) {
            onOrderDelete?.(order);
          }
        }}
      >
        Delete
      </button>
      <h2>{new Date(order.createdAt).toDateString()}</h2>
      <Link
        to={{ type: RoutesActionType.USER, payload: { userID: order.user.id } }}
      >
        {order.user.name}
      </Link>
      <div>{`${productsGrouped.length} product(s)`}</div>
      <List>
        {productsGrouped.map(
          ({ 0: productID, 1: { 0: product, length: count } }) => (
            <ListItem key={productID}>
              <Count>{count} x</Count>
              <ProductSummary product={product} />
            </ListItem>
          )
        )}
      </List>
      {`Total: $${order.totalPrice}`}
    </article>
  );
}

function Count({ style, ...props }: HTMLAttributes<HTMLElement>) {
  return <div style={{ marginRight: 16, ...style }} {...props} />;
}

export function List({ style, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: '16px 0 0 0',
        ...style,
      }}
      {...props}
    />
  );
}

export function ListItem({ style, ...props }: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 16,
        ...style,
      }}
      {...props}
    />
  );
}
