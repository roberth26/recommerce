import React from 'react';

import { Page } from './Page';
import { OrderListContainer } from './OrderListContainer';
import { FullLayout } from './FullLayout';

export function OrdersScreen() {
  return (
    <Page>
      <FullLayout>
        <h2>Orders</h2>
        <OrderListContainer />
      </FullLayout>
    </Page>
  );
}
