import React, { HTMLAttributes, ReactNode } from 'react';
import { pipe, groupBy, entries } from 'lodash/fp';
import { Order } from '../types';
import { Product } from '../../products/types';
import { User } from '../../users/types';
import { ProductCategoryID } from '../../product-categories/types';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { NavLink } from '../../utils/NavLink';

interface OrderDetailProps {
  order: Order<Product<ProductCategoryID>, User> | undefined | null;
  onOrderDelete?: (order: Order<Product<ProductCategoryID>, User>) => void;
  renderProduct: (product: Product<ProductCategoryID>) => ReactNode;
}

export function OrderDetail({
  order,
  onOrderDelete,
  renderProduct,
}: OrderDetailProps) {
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
      <NavLink
        to={{ type: RoutesActionType.USER, payload: { userID: order.user.id } }}
      >
        {order.user.fullName}
      </NavLink>
      <div>{`${productsGrouped.length} product(s)`}</div>
      <List>
        {productsGrouped.map(
          ({ 0: productID, 1: { 0: product, length: count } }) => (
            <ListItem key={productID}>
              <Count>{count} x</Count>
              {renderProduct(product)}
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
