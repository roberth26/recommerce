import { ComponentProps } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ProductCategoryEditor } from '../../entities/product-categories/components/ProductCategoryEditor';
import { ProductCategoryID } from '../../entities/product-categories/types';
import { State } from '../types';
import { getProductCategoryByID } from '../selectors';
import {
  updateProductCategory,
  createProductCategory,
} from '../../entities/product-categories/actions';

type ProductCategoryEditorProps = ComponentProps<typeof ProductCategoryEditor>;

type ProductCategoryEditorContainerStateProps = Pick<
  ProductCategoryEditorProps,
  'productCategory'
>;

type ProductCategoryEditorContainerDispatchProps = Pick<
  ProductCategoryEditorProps,
  never
> & {
  dispatch: Dispatch;
};

type ProductCategoryEditorContainerOwnProps = Omit<
  ProductCategoryEditorProps,
  | keyof ProductCategoryEditorContainerStateProps
  | keyof ProductCategoryEditorContainerDispatchProps
> &
  Pick<ProductCategoryEditorProps, 'onProductCategoryEdit'> & {
    productCategoryID?: ProductCategoryID | undefined;
  };

type ProductCategoryEditorContainerMergeProps = ProductCategoryEditorContainerStateProps &
  Required<Pick<ProductCategoryEditorProps, 'onProductCategoryEdit'>>;

export const ProductCategoryEditorContainer = connect<
  ProductCategoryEditorContainerStateProps,
  ProductCategoryEditorContainerDispatchProps,
  ProductCategoryEditorContainerOwnProps,
  ProductCategoryEditorContainerMergeProps,
  State
>(
  (state, { productCategoryID }) => ({
    productCategory: getProductCategoryByID(state, productCategoryID),
  }),
  dispatch => ({
    dispatch,
  }),
  (stateProps, { dispatch }, { onProductCategoryEdit }) => ({
    ...stateProps,
    onProductCategoryEdit: editedProductCategory => {
      const { productCategory } = stateProps;

      onProductCategoryEdit?.(editedProductCategory);

      if (productCategory) {
        dispatch(
          updateProductCategory({ productCategory: editedProductCategory })
        );
      } else {
        dispatch(
          createProductCategory({ productCategory: editedProductCategory })
        );
      }
    },
  })
)(ProductCategoryEditor);
