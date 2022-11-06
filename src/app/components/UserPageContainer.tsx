import React from 'react';
import { connect } from 'react-redux';
import { UserID } from '../../users/types';
import { State } from '../types';
import { getCurrentRouteUserID } from '../selectors';
import { UserDetailContainer } from './UserDetailContainer';
import { ProductReviewListContainer } from './ProductReviewListContainer';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { SplitPane } from '../../utils/SplitPane';
import { OrdersTableContainer } from './OrdersTableContainer';

type UserPageProps = {
  userID: UserID | undefined | null;
};

export function UserPage({ userID }: UserPageProps) {
  return (
    <Page>
      <FullLayout>
        <UserDetailContainer userID={userID} />
        <SplitPane>
          <div>
            <h2>Reviews</h2>
            <ProductReviewListContainer userID={userID} />
          </div>
          <div>
            <h2>Orders</h2>
            <OrdersTableContainer userID={userID} />
          </div>
        </SplitPane>
      </FullLayout>
    </Page>
  );
}

type UserPageContainerStateProps = Pick<UserPageProps, 'userID'>;

type UserPageContainerDispatchProps = Pick<UserPageProps, never>;

type UserPageContainerOwnProps = Omit<
  UserPageProps,
  keyof UserPageContainerStateProps | keyof UserPageContainerDispatchProps
>;

export const UserPageContainer = connect<
  UserPageContainerStateProps,
  UserPageContainerDispatchProps,
  UserPageContainerOwnProps,
  State
>(state => ({
  userID: getCurrentRouteUserID(state),
}))(UserPage);
