import React from 'react';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductCategoryEditorContainer } from './ProductCategoryEditorContainer';

interface ProductCategoryCreatePageProps {}

export function ProductCategoryCreatePage(
  _props: ProductCategoryCreatePageProps
) {
  return (
    <Page>
      <FullLayout>
        <h2>Create Category</h2>
        <ProductCategoryEditorContainer />
      </FullLayout>
    </Page>
  );
}
