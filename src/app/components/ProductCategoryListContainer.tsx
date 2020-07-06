import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { State } from '../types';
import { getProductCategories } from '../selectors';
import { ProductCategoryList } from '../../product-categories/components/ProductCategoryList';

type ProductCategoryListProps = ComponentProps<typeof ProductCategoryList>;

type ProductCategoryListStateProps = Pick<
  ProductCategoryListProps,
  'categories'
>;

type ProductCategoryListDispatchProps = {};

type ProductCategoryListOwnProps = Omit<
  ProductCategoryListProps,
  keyof ProductCategoryListStateProps | keyof ProductCategoryListDispatchProps
>;

export const ProductCategoryListContainer = connect<
  ProductCategoryListStateProps,
  ProductCategoryListDispatchProps,
  ProductCategoryListOwnProps,
  State
>(state => ({
  categories: getProductCategories(state),
}))(ProductCategoryList);
