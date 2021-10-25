import React from 'react';
import { connect } from 'react-redux';
import { UserID } from '../../users/types';
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
};

export function UserScreen({ userID }: UserScreenProps) {
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
            <OrderListContainer userID={userID} />
          </div>
        </SplitPane>
      </FullLayout>
    </Page>
  );
}

type UserScreenContainerStateProps = Pick<UserScreenProps, 'userID'>;

type UserScreenContainerDispatchProps = Pick<UserScreenProps, never>;

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
