import React from 'react';

import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { OrdersTableContainer } from './OrdersTableContainer';

export function OrdersPage() {
  return (
    <Page>
      <FullLayout>
        <h2>Orders</h2>
        <OrdersTableContainer />
      </FullLayout>
    </Page>
  );
}
