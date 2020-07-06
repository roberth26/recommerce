import React, { HTMLAttributes } from 'react';
import { OrderID } from '../../orders/types';
import { OrderSummaryContainer } from './OrderSummaryContainer';
import { connect } from 'react-redux';
import { State } from '../types';
import { getOrderIDsByUserID, getOrderIDs } from '../selectors';
import { UserID } from '../../users/types';

type OrderListProps = {
  orderIDs: Array<OrderID>;
};

export function OrderList({ orderIDs }: OrderListProps) {
  if (orderIDs.length === 0) {
    return <div>No orders</div>;
  }

  return (
    <Root>
      {orderIDs.map(orderID => (
        <li key={orderID}>
          <OrderSummaryContainer orderID={orderID} />
        </li>
      ))}
    </Root>
  );
}

type OrderListContainerStateProps = Pick<OrderListProps, 'orderIDs'>;

type OrderListContainerDispatchProps = Pick<OrderListProps, never>;

type OrderListContainerOwnProps = Omit<
  OrderListProps,
  keyof OrderListContainerStateProps | keyof OrderListContainerDispatchProps
> & {
  userID?: UserID | null;
};

export const OrderListContainer = connect<
  OrderListContainerStateProps,
  OrderListContainerDispatchProps,
  OrderListContainerOwnProps,
  State
>((state, { userID }) => ({
  orderIDs:
    userID != null ? getOrderIDsByUserID(state, userID) : getOrderIDs(state),
}))(OrderList);

export function Root({ style, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        ...style,
      }}
      {...props}
    />
  );
}
