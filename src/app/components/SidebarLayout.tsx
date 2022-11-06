import React, { ReactNode, HTMLAttributes } from 'react';

interface SidebarLayoutProps {
  sidebarContent?: ReactNode | null;
  mainContent?: ReactNode | null;
}

export function SidebarLayout({
  sidebarContent,
  mainContent,
}: SidebarLayoutProps) {
  return (
    <Root>
      <Sidebar>{sidebarContent}</Sidebar>
      <Main>{mainContent}</Main>
    </Root>
  );
}

export function Root({ style, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '160px auto',
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    />
  );
}

export function Sidebar({ style, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <aside
      style={{
        padding: 16,
        overflow: 'auto',
        borderRight: '1px solid lightgrey',
        ...style,
      }}
      {...props}
    />
  );
}

export function Main({ style, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <main style={{ padding: 16, overflow: 'auto', ...style }} {...props} />
  );
}
