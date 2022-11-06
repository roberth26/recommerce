import React from 'react';
import { Page } from './Page';
import { UserListContainer } from './UserListContainer';
import { FullLayout } from './FullLayout';

export function UsersPage() {
  return (
    <Page>
      <FullLayout>
        <h2>Users</h2>
        {/** TODO: build users table */}
        <UserListContainer />
      </FullLayout>
    </Page>
  );
}
