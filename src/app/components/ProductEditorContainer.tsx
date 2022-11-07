import { ComponentProps } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ProductEditor } from '../../products/components/ProductEditor';
import { ProductID } from '../../products/types';
import { State } from '../types';
import { getProductByIDDenormalized, getProductCategories } from '../selectors';
import { updateProduct, createProduct } from '../../products/actions';

type ProductEditorProps = ComponentProps<typeof ProductEditor>;

type ProductEditorContainerStateProps = Pick<
  ProductEditorProps,
  'product' | 'productCategories'
>;

type ProductEditorContainerDispatchProps = Pick<ProductEditorProps, never> & {
  dispatch: Dispatch;
};

type ProductEditorContainerOwnProps = Omit<
  ProductEditorProps,
  | keyof ProductEditorContainerStateProps
  | keyof ProductEditorContainerDispatchProps
> &
  Pick<ProductEditorProps, 'onProductEdit' | 'onCancel'> & {
    productID?: ProductID | undefined;
  };

type ProductEditorContainerMergeProps = ProductEditorContainerStateProps &
  Required<Pick<ProductEditorProps, 'onProductEdit' | 'onCancel'>>;

export const ProductEditorContainer = connect<
  ProductEditorContainerStateProps,
  ProductEditorContainerDispatchProps,
  ProductEditorContainerOwnProps,
  ProductEditorContainerMergeProps,
  State
>(
  (state, { productID }) => ({
    product: getProductByIDDenormalized(state, productID),
    productCategories: getProductCategories(state),
  }),
  dispatch => ({
    dispatch,
  }),
  (stateProps, { dispatch }, { onProductEdit, onCancel }) => ({
    ...stateProps,
    onProductEdit: editedProduct => {
      const { product } = stateProps;

      onProductEdit?.(editedProduct);

      if (product) {
        dispatch(updateProduct({ product: editedProduct }));
      } else {
        dispatch(createProduct({ product: editedProduct }));
      }
    },
    onCancel: product => {
      onCancel?.(product);
    },
  })
)(ProductEditor);
