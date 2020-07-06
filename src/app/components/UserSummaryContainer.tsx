import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { UserSummary } from '../../entities/users/components/UserSummary';
import { State } from '../types';
import { getUserByID } from '../selectors';
import { UserID } from '../../entities/users/types';

type UserSummaryProps = ComponentProps<typeof UserSummary>;

type UserSummaryContainerStateProps = Pick<UserSummaryProps, 'user'>;

type UserSummaryContainerDispatchProps = {};

type UserSummaryContainerOwnProps = Omit<
  UserSummaryProps,
  keyof UserSummaryContainerStateProps | keyof UserSummaryContainerDispatchProps
> & {
  userID: UserID;
};

export const UserSummaryContainer = connect<
  UserSummaryContainerStateProps,
  UserSummaryContainerDispatchProps,
  UserSummaryContainerOwnProps,
  State
>((state, { userID }) => ({
  user: getUserByID(state, userID),
}))(UserSummary);
