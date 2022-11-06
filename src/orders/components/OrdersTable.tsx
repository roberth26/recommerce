import React, { useMemo } from 'react';
import { NavLink } from '../../utils/NavLink';
import { Table, TableColumn } from '../../utils/Table';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { Order, OrderProduct } from '../types';
import { map, pipe, size, uniq } from 'lodash/fp';
import { User } from '../../users/types';

type ColumnKey = Extract<
  keyof Order,
  'id' | 'createdAt' | 'products' | 'totalPrice' | 'user'
>;

interface OrdersTableProps {
  orders: Array<Order<OrderProduct, User>>;
  excludeColumnKeys?: Array<ColumnKey>;
}

const COLUMNS = Array.of<TableColumn<Order, ColumnKey>>(
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
      <>{new Date(createdAt as string).toLocaleDateString()}</>
    ),
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
      align: 'right',
    },
    cellProps: {
      style: {
        textAlign: 'right',
      },
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
      align: 'left',
    },
  }
);

export function OrdersTable({ orders, excludeColumnKeys }: OrdersTableProps) {
  const filteredColumns = useMemo(() => {
    const set = new Set(excludeColumnKeys);
    return COLUMNS.filter(column => !set.has(column.key));
  }, [excludeColumnKeys]);

  return <Table items={orders} columns={filteredColumns} />;
}
