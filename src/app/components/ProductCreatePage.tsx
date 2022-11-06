import React from 'react';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductEditorContainer } from './ProductEditorContainer';

interface ProductCreatePageProps {}

export function ProductCreatePage(_props: ProductCreatePageProps) {
  return (
    <Page>
      <FullLayout>
        <h2>Create Product</h2>
        <ProductEditorContainer />
      </FullLayout>
    </Page>
  );
}
