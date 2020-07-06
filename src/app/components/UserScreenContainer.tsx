import React from 'react';
import { connect } from 'react-redux';
import { UserID, User } from '../../entities/users/types';
import { State } from '../types';
import { getCurrentRouteUserID } from '../selectors';
import { UserDetailContainer } from './UserDetailContainer';
import { ProductReviewListContainer } from './ProductReviewListContainer';
import { OrderListContainer } from './OrderListContainer';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { SplitPane } from '../../utils/SplitPane';

type UserScreenProps = {
  userID: UserID | undefined | null;
  onUserDelete?: (user: User) => void;
};

export function UserScreen({ userID, onUserDelete }: UserScreenProps) {
  return (
    <Page>
      <FullLayout>
        <UserDetailContainer
          userID={userID}
          onUserDelete={user => onUserDelete?.(user)}
        />
        <SplitPane>
          <div>
            <h2>Reviews</h2>
            <ProductReviewListContainer userID={userID} />
          </div>
          <div>
            <h2>Orders</h2>
            <OrderListContainer userID={userID} />
          </div>
        </SplitPane>
      </FullLayout>
    </Page>
  );
}

type UserScreenContainerStateProps = Pick<UserScreenProps, 'userID'>;

type UserScreenContainerDispatchProps = Pick<UserScreenProps, 'onUserDelete'>;

type UserScreenContainerOwnProps = Omit<
  UserScreenProps,
  keyof UserScreenContainerStateProps | keyof UserScreenContainerDispatchProps
>;

export const UserScreenContainer = connect<
  UserScreenContainerStateProps,
  UserScreenContainerDispatchProps,
  UserScreenContainerOwnProps,
  State
>(state => ({
  userID: getCurrentRouteUserID(state),
}))(UserScreen);
