import React, { useMemo } from 'react';
import { NavLink } from '../../utils/NavLink';
import { Table, TableColumn } from '../../utils/Table';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { User } from '../types';

type ColumnKey = Extract<keyof User, 'id' | 'username' | 'fullName' | 'email'>;

interface UsersTableProps {
  users: Array<User>;
  excludeColumnKeys?: Array<ColumnKey>;
}

const COLUMNS = Array.of<TableColumn<User, ColumnKey>>(
  {
    key: 'id',
    header: 'ID',
    renderCell: ({ value: userID }) => (
      <NavLink
        to={{
          type: RoutesActionType.USER,
          payload: { userID: userID as string },
        }}
      >
        {userID}
      </NavLink>
    ),
    headerProps: {
      align: 'left',
    },
  },
  {
    key: 'username',
    header: 'Username',
    renderCell: ({ value: username }) => <>{username}</>,
    headerProps: {
      align: 'left',
    },
  },
  {
    key: 'fullName',
    header: 'FullName',
    renderCell: ({ value: fullName }) => <>{fullName}</>,
    headerProps: {
      align: 'left',
    },
  },
  {
    key: 'email',
    header: 'Email',
    renderCell: ({ value: email }) => <>{email}</>,
    headerProps: {
      align: 'left',
    },
  }
);

export function UsersTable({ users, excludeColumnKeys }: UsersTableProps) {
  const filteredColumns = useMemo(() => {
    const set = new Set(excludeColumnKeys);
    return COLUMNS.filter(column => !set.has(column.key));
  }, [excludeColumnKeys]);

  return <Table items={users} columns={filteredColumns} />;
}
