import React, { ReactNode, HTMLAttributes } from 'react';

type FullLayoutProps = {
  children?: ReactNode | null;
};

export function FullLayout({ children }: FullLayoutProps) {
  return <Root>{children}</Root>;
}

export function Root({ style, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        padding: 16,
        overflow: 'auto',
        ...style,
      }}
      {...props}
    />
  );
}
