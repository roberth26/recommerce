import { connect } from 'react-redux';
import { State } from '../types';
import { getProducts } from '../selectors';
import { Picker, PickerProps } from '../../utils/Picker';
import { Product } from '../../products/types';
import { ComponentType, ComponentProps } from 'react';
import { ProductCategoryID } from '../../product-categories/types';

const ProductPicker = Picker as ComponentType<
  PickerProps<Product<ProductCategoryID>>
>;

type ProductPickerProps = ComponentProps<typeof ProductPicker>;

type ProductPickerContainerStateProps = Pick<ProductPickerProps, 'items'>;

type ProductPickerContainerDispatchProps = Required<
  Pick<ProductPickerProps, never>
>;

type ProductPickerContainerOwnProps = Omit<
  ProductPickerProps,
  | keyof ProductPickerContainerStateProps
  | keyof ProductPickerContainerDispatchProps
>;

export const ProductPickerContainer = connect<
  ProductPickerContainerStateProps,
  ProductPickerContainerDispatchProps,
  ProductPickerContainerOwnProps,
  State
>(state => ({
  items: getProducts(state),
}))(ProductPicker);
