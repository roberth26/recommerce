import React, { HTMLAttributes } from 'react';
import { UserID } from '../../entities/users/types';
import { UserSummaryContainer } from './UserSummaryContainer';
import { connect } from 'react-redux';
import { State } from '../types';
import { getUserIDs } from '../selectors';

type UserListProps = {
  userIDs: Array<UserID>;
};

export function UserList({ userIDs }: UserListProps) {
  return (
    <Root>
      {userIDs.map(userID => (
        <li key={userID}>
          <UserSummaryContainer userID={userID} />
        </li>
      ))}
    </Root>
  );
}

type UserListContainerStateProps = Pick<UserListProps, 'userIDs'>;

type UserListContainerDispatchProps = {};

type UserListContainerOwnProps = Omit<
  UserListProps,
  keyof UserListContainerStateProps | keyof UserListContainerDispatchProps
>;

export const UserListContainer = connect<
  UserListContainerStateProps,
  UserListContainerDispatchProps,
  UserListContainerOwnProps,
  State
>(state => ({
  userIDs: getUserIDs(state),
}))(UserList);

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
