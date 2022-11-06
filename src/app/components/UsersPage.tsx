import React from 'react';
import { Page } from './Page';
import { UsersTableContainer } from './UsersTableContainer';
import { FullLayout } from './FullLayout';

export function UsersPage() {
  return (
    <Page>
      <FullLayout>
        <h2>Users</h2>
        <UsersTableContainer />
      </FullLayout>
    </Page>
  );
}
