import React from 'react';
import { Page } from './Page';
import { UserListContainer } from './UserListContainer';
import { FullLayout } from './FullLayout';

export function UsersScreen() {
  return (
    <Page>
      <FullLayout>
        <h2>Users</h2>
        <UserListContainer />
      </FullLayout>
    </Page>
  );
}
