import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { State } from '../types';
import { getProductCategories } from '../selectors';
import { ProductCategoriesList } from '../../product-categories/components/ProductCategoriesList';

type ProductCategoriesListProps = ComponentProps<typeof ProductCategoriesList>;

type ProductCategoriesListStateProps = Pick<
  ProductCategoriesListProps,
  'categories'
>;

type ProductCategoriesListDispatchProps = Pick<
  ProductCategoriesListProps,
  never
>;

type ProductCategoriesListOwnProps = Omit<
  ProductCategoriesListProps,
  | keyof ProductCategoriesListStateProps
  | keyof ProductCategoriesListDispatchProps
>;

export const ProductCategoriesListContainer = connect<
  ProductCategoriesListStateProps,
  ProductCategoriesListDispatchProps,
  ProductCategoriesListOwnProps,
  State
>(state => ({
  categories: getProductCategories(state),
}))(ProductCategoriesList);
