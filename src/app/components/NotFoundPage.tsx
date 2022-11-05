import React from 'react';
import { Page } from './Page';
import { FullLayout } from './FullLayout';

export function NotFoundPage() {
  return (
    <Page>
      <FullLayout>This page could not be found</FullLayout>
    </Page>
  );
}
