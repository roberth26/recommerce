import React, { HTMLAttributes } from 'react';
import { ProductCategory } from '../types';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { NavLink } from '../../utils/NavLink';

type ProductCategoryListProps = {
  categories: ProductCategory[];
};

export function ProductCategoryList({ categories }: ProductCategoryListProps) {
  return (
    <Root>
      {categories.map(category => (
        <ListItem key={category.id}>
          <NavLink
            to={{
              type: RoutesActionType.PRODUCTS,
              meta: {
                query: { productCategoryID: category.id },
              },
            }}
            isActive={(_, { query }) =>
              query?.productCategoryID === category.id
            }
          >
            {category.name}
          </NavLink>
        </ListItem>
      ))}
    </Root>
  );
}

export function Root({ style, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        ...style,
      }}
      {...props}
    />
  );
}

export function ListItem({ style, ...props }: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      style={{
        marginBottom: 8,
        ...style,
      }}
      {...props}
    />
  );
}
