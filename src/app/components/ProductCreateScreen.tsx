import React from 'react';
import { useDispatch } from 'react-redux';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductEditorContainer } from './ProductEditorContainer';
import { ActionType as RoutesActionType } from '../../routes/actions';

export function ProductCreateScreen() {
  const dispatch = useDispatch();

  return (
    <Page>
      <FullLayout>
        <h2>Create Product</h2>
        <ProductEditorContainer
          onProductEdit={() => dispatch({ type: RoutesActionType.PRODUCTS })}
        />
      </FullLayout>
    </Page>
  );
}
