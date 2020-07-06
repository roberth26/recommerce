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
  'product' | 'categories'
>;

type ProductEditorContainerDispatchProps = Pick<ProductEditorProps, never> & {
  dispatch: Dispatch;
};

type ProductEditorContainerOwnProps = Omit<
  ProductEditorProps,
  | keyof ProductEditorContainerStateProps
  | keyof ProductEditorContainerDispatchProps
> &
  Pick<ProductEditorProps, 'onProductEdit'> & {
    productID?: ProductID | undefined;
  };

type ProductEditorContainerMergeProps = ProductEditorContainerStateProps &
  Required<Pick<ProductEditorProps, 'onProductEdit'>>;

export const ProductEditorContainer = connect<
  ProductEditorContainerStateProps,
  ProductEditorContainerDispatchProps,
  ProductEditorContainerOwnProps,
  ProductEditorContainerMergeProps,
  State
>(
  (state, { productID }) => ({
    product: getProductByIDDenormalized(state, productID),
    categories: getProductCategories(state),
  }),
  dispatch => ({
    dispatch,
  }),
  (stateProps, { dispatch }, { onProductEdit }) => ({
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
  })
)(ProductEditor);
