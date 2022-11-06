import React from 'react';
import { NavLink } from '../../utils/NavLink';
import { Table, TableColumn } from '../../utils/Table';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { Order, OrderProduct } from '../types';
import { map, pipe, size, uniq } from 'lodash/fp';
import { User } from '../../users/types';

interface OrdersTableProps {
  orders: Array<Order<OrderProduct, User>>;
}

const COLUMNS = Array.of<
  TableColumn<Order, 'id' | 'createdAt' | 'products' | 'totalPrice' | 'user'>
>(
  {
    key: 'id',
    header: 'ID',
    renderCell: ({ value: orderID }) => (
      <NavLink
        to={{
          type: RoutesActionType.ORDER,
          payload: { orderID: orderID as string },
        }}
      >
        {orderID}
      </NavLink>
    ),
    headerProps: {
      align: 'left',
    },
  },
  {
    key: 'createdAt',
    header: 'Date',
    renderCell: ({ value: createdAt }) => (
      <>{new Date(createdAt as string).toDateString()}</>
    ),
    headerProps: {
      align: 'left',
    },
  },
  {
    key: 'products',
    header: 'Products',
    renderCell: ({ value: products }) => (
      <>
        {pipe(
          () => products as Array<OrderProduct>,
          map(product => (typeof product === 'string' ? product : product.id)),
          uniq,
          size
        )()}
      </>
    ),
    headerProps: {
      align: 'left',
    },
  },
  {
    key: 'totalPrice',
    header: 'Total Price',
    renderCell: ({ value: totalPrice }) => <>${totalPrice}</>,
    headerProps: {
      align: 'right',
    },
    cellProps: {
      style: {
        textAlign: 'right',
      },
    },
  },
  {
    key: 'user',
    header: 'User',
    renderCell: ({ value: user }) => (
      <NavLink
        to={{
          type: RoutesActionType.USER,
          payload: {
            userID: (user as User).id,
          },
        }}
      >
        {(user as User).name}
      </NavLink>
    ),
    headerProps: {
      align: 'right',
    },
    cellProps: {
      style: {
        textAlign: 'right',
      },
    },
  }
);

export function OrdersTable({ orders }: OrdersTableProps) {
  return <Table items={orders} columns={COLUMNS} />;
}
