import React, { HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { ProductListContainer } from './ProductListContainer';
import { SidebarLayout } from './SidebarLayout';
import { ProductCategoryListContainer } from './ProductCategoryListContainer';
import { Page } from './Page';
import { ProductCategory } from '../../product-categories/types';
import { State } from '../types';
import { getCurrentProductCategory } from '../selectors';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { deleteProductCategory } from '../../product-categories/actions';
import { NavLink } from '../../utils/NavLink';
import { NavButton } from '../../utils/NavButton';

type ProductsPageProps = {
  productCategory: ProductCategory | undefined | null;
  onProductCategoryDelete?: (productCategory: ProductCategory) => void;
};

export function ProductsPage({
  productCategory,
  onProductCategoryDelete,
}: ProductsPageProps) {
  return (
    <Page>
      <SidebarLayout
        sidebarContent={
          <>
            <ProductCategoryListContainer />
            <br />
            <br />
            <NavButton to={{ type: RoutesActionType.PRODUCT_CATEGORY_CREATE }}>
              Create Category
            </NavButton>
          </>
        }
        mainContent={
          <>
            <Header>
              <div>
                <h2>{productCategory?.name ?? 'All Products'}</h2>{' '}
                {productCategory && (
                  <>
                    <NavLink
                      to={{
                        type: RoutesActionType.PRODUCT_CATEGORY_EDIT,
                        payload: { productCategoryID: productCategory.id },
                      }}
                    >
                      Edit Category
                    </NavLink>
                    &nbsp; &nbsp;
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${productCategory.name}?`
                          )
                        ) {
                          onProductCategoryDelete?.(productCategory);
                        }
                      }}
                    >
                      Delete Category
                    </button>
                  </>
                )}
              </div>
              <NavButton to={{ type: RoutesActionType.PRODUCT_CREATE }}>
                Create Product
              </NavButton>
            </Header>
            <ProductListContainer productCategoryID={productCategory?.id} />
          </>
        }
      />
    </Page>
  );
}

type ProductsPageContainerStateProps = Pick<
  ProductsPageProps,
  'productCategory'
>;

type ProductsPageContainerDispatchProps = Required<
  Pick<ProductsPageProps, 'onProductCategoryDelete'>
>;

type ProductsPageContainerOwnProps = Omit<
  ProductsPageProps,
  | keyof ProductsPageContainerStateProps
  | keyof ProductsPageContainerDispatchProps
>;

export const ProductsPageContainer = connect<
  ProductsPageContainerStateProps,
  ProductsPageContainerDispatchProps,
  ProductsPageContainerOwnProps,
  State
>(
  state => ({
    productCategory: getCurrentProductCategory(state),
  }),
  dispatch => ({
    onProductCategoryDelete: productCategory =>
      dispatch(
        deleteProductCategory({ productCategoryID: productCategory.id })
      ),
  })
)(ProductsPage);

function Header({ style, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        ...style,
      }}
      {...props}
    />
  );
}
