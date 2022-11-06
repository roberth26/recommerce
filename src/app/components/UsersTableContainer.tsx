import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { UsersTable } from '../../users/components/UsersTable';
import { State } from '../types';
import { getUsers } from '../selectors';

type UsersTableProps = ComponentProps<typeof UsersTable>;

type UsersTableContainerStateProps = Pick<UsersTableProps, 'users'>;

type UsersTableContainerDispatchProps = Required<Pick<UsersTableProps, never>>;

type UsersTableContainerOwnProps = Omit<
  UsersTableProps,
  keyof UsersTableContainerStateProps | keyof UsersTableContainerDispatchProps
>;

export const UsersTableContainer = connect<
  UsersTableContainerStateProps,
  UsersTableContainerDispatchProps,
  UsersTableContainerOwnProps,
  State
>(state => ({
  users: getUsers(state),
}))(UsersTable);
