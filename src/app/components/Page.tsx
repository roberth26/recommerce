import React, { ReactNode, HTMLAttributes } from 'react';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { NavLink } from '../../utils/NavLink';

type PageProps = {
  children: ReactNode;
};

export function Page({ children }: PageProps) {
  return (
    <Root>
      <Header>
        <NavLink to={{ type: RoutesActionType.PRODUCTS }}>
          <h1>Recommerce</h1>
        </NavLink>
        <nav>
          <NavList>
            <NavListItem>
              <NavLink
                to={{ type: RoutesActionType.PRODUCTS }}
                isActive={match => match?.isExact}
              >
                Products
              </NavLink>
            </NavListItem>
            <NavListItem>
              <NavLink
                to={{ type: RoutesActionType.ORDERS }}
                isActive={match => match?.isExact}
              >
                Orders
              </NavLink>
            </NavListItem>
            <NavListItem>
              <NavLink
                to={{ type: RoutesActionType.USERS }}
                isActive={match => match?.isExact}
              >
                Users
              </NavLink>
            </NavListItem>
          </NavList>
        </nav>
      </Header>
      {children}
    </Root>
  );
}

export function Root({ style, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr',
        fontFamily: 'system-ui',
        ...style,
      }}
      {...props}
    />
  );
}

export function Header({ style, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottom: '1px solid lightgrey',
        ...style,
      }}
      {...props}
    />
  );
}

export function NavList({ style, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      style={{
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
      {...props}
    />
  );
}

export function NavListItem({
  style,
  ...props
}: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      style={{
        marginLeft: 16,
        ...style,
      }}
      {...props}
    />
  );
}
