import React, { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { UserID } from '../../users/types';
import { State } from '../types';
import { getCurrentRouteUserID } from '../selectors';
import { UserDetailContainer } from './UserDetailContainer';
import { ProductReviewListContainer } from './ProductReviewListContainer';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { OrdersTableContainer } from './OrdersTableContainer';

const ORDERS_TABLE_EXCLUDED_COLUMN_KEYS =
  Array.of<
    NonNullable<
      ComponentProps<typeof OrdersTableContainer>['excludeColumnKeys']
    >[number]
  >('user');

interface UserPageProps {
  userID: UserID | undefined | null;
}

export function UserPage({ userID }: UserPageProps) {
  return (
    <Page>
      <FullLayout>
        <UserDetailContainer userID={userID} />
        <h3>Orders</h3>
        <OrdersTableContainer
          userID={userID}
          excludeColumnKeys={ORDERS_TABLE_EXCLUDED_COLUMN_KEYS}
        />
        <h3>Reviews</h3>
        <ProductReviewListContainer userID={userID} />
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
