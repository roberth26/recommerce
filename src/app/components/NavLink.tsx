import React, { ComponentProps } from 'react';
import { NavLink as ReduxFirstRouterNavLink } from 'redux-first-router-link';

type ReduxFirstRouterNavLinkProps = ComponentProps<
  typeof ReduxFirstRouterNavLink
>;

type NavLinkProps = ReduxFirstRouterNavLinkProps;

export function NavLink({ activeStyle, ...props }: NavLinkProps) {
  return (
    <ReduxFirstRouterNavLink
      activeStyle={{
        color: 'black',
        textDecoration: 'none',
        ...activeStyle,
      }}
      {...props}
    />
  );
}
