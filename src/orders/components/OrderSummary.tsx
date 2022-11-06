import React, { HTMLAttributes } from 'react';
import { uniq, pipe, map, size } from 'lodash/fp';
import { Order } from '../types';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { Product } from '../../products/types';
import { User } from '../../users/types';
import { NavLink } from '../../utils/NavLink';

type OrderSummaryProps = {
  order: Order<Product, User> | undefined | null;
};

export function OrderSummary({ order }: OrderSummaryProps) {
  if (order == null) {
    return null;
  }

  const productsCount = pipe(
    () => order.products,
    map((product: Product) => product.id),
    uniq,
    size
  )();

  return (
    <Root>
      <Item>
        <NavLink
          to={{ type: RoutesActionType.ORDER, payload: { orderID: order.id } }}
        >
          {new Date(order.createdAt).toDateString()}
        </NavLink>
      </Item>
      <Item>
        <NavLink
          to={{ type: RoutesActionType.ORDER, payload: { orderID: order.id } }}
        >{`${productsCount} product(s)`}</NavLink>
      </Item>
      <Item>
        <NavLink
          to={{ type: RoutesActionType.ORDER, payload: { orderID: order.id } }}
        >
          {`Total: $${order.totalPrice}`}
        </NavLink>
      </Item>
    </Root>
  );
}

function Root({ style, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <article
      style={{ display: 'flex', alignItems: 'center', ...style }}
      {...props}
    />
  );
}

function Item({ style, ...props }: HTMLAttributes<HTMLElement>) {
  return <div style={{ marginRight: 16, ...style }} {...props} />;
}
