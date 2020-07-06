import React from 'react';
import { useDispatch } from 'react-redux';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductCategoryEditorContainer } from './ProductCategoryEditorContainer';
import { ActionType as RoutesActionType } from '../../routes/actions';

type ProductCategoryCreateScreenProps = {};

export function ProductCategoryCreateScreen(
  props: ProductCategoryCreateScreenProps
) {
  const dispatch = useDispatch();

  return (
    <Page>
      <FullLayout>
        <h2>Create Category</h2>
        <ProductCategoryEditorContainer
          onProductCategoryEdit={productCategory =>
            dispatch({
              type: RoutesActionType.PRODUCTS,
              meta: { query: { productCategoryID: productCategory.id } },
            })
          }
        />
      </FullLayout>
    </Page>
  );
}
