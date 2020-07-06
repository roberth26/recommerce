import React, { HTMLAttributes } from 'react';

export function SplitPane({ style, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: 16,
        ...style,
      }}
      {...props}
    />
  );
}
