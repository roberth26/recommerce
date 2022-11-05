import React, { ComponentProps } from 'react';
import { NavLink as ReduxFirstRouterNavLink } from 'redux-first-router-link';

type ReduxFirstRouterNavLinkProps = ComponentProps<
  typeof ReduxFirstRouterNavLink
>;

type NavButtonProps = ReduxFirstRouterNavLinkProps;

export function NavButton({ activeStyle, ...props }: NavButtonProps) {
  return <ReduxFirstRouterNavLink tagName="button" {...props} />;
}
