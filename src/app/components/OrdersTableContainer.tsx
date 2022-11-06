import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { OrdersTable } from '../../orders/components/OrdersTable';
import { UserID } from '../../users/types';
import {
  getOrdersByUserIDDenormalized,
  getOrdersDenormalized,
} from '../selectors';
import { State } from '../types';

type OrdersTableProps = ComponentProps<typeof OrdersTable>;

type OrdersTableContainerStateProps = Pick<OrdersTableProps, 'orders'>;

type OrdersTableContainerDispatchProps = Pick<OrdersTableProps, never>;

type OrdersTableConainerOwnProps = Omit<
  OrdersTableProps,
  keyof OrdersTableContainerStateProps | keyof OrdersTableContainerDispatchProps
> & {
  userID?: UserID | null;
};

export const OrdersTableContainer = connect<
  OrdersTableContainerStateProps,
  OrdersTableContainerDispatchProps,
  OrdersTableConainerOwnProps,
  State
>((state, { userID }) => ({
  orders:
    userID == null
      ? getOrdersDenormalized(state)
      : getOrdersByUserIDDenormalized(state, userID),
}))(OrdersTable);
