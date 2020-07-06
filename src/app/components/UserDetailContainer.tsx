import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { UserDetail } from '../../entities/users/components/UserDetail';
import { State } from '../types';
import { getUserByID } from '../selectors';
import { UserID } from '../../entities/users/types';
import { deleteUser } from '../../entities/users/actions';

type UserDetailProps = ComponentProps<typeof UserDetail>;

type UserDetailContainerStateProps = Pick<UserDetailProps, 'user'>;

type UserDetailContainerDispatchProps = Required<
  Pick<UserDetailProps, 'onUserDelete'>
>;

type UserDetailContainerOwnProps = Omit<
  UserDetailProps,
  | keyof UserDetailContainerStateProps
  | keyof Omit<UserDetailContainerDispatchProps, 'onUserDelete'>
> & {
  userID: UserID | undefined | null;
};

export const UserDetailContainer = connect<
  UserDetailContainerStateProps,
  UserDetailContainerDispatchProps,
  UserDetailContainerOwnProps,
  State
>(
  (state, { userID }) => ({
    user: getUserByID(state, userID),
  }),
  (dispatch, { onUserDelete }) => ({
    onUserDelete: user => {
      dispatch(deleteUser({ userID: user.id }));
      onUserDelete?.(user);
    },
  })
)(UserDetail);
