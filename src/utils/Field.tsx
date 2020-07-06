import React, { HTMLAttributes } from 'react';

export function Field({ style, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 320,
        marginBottom: 16,
        ...style,
      }}
      {...props}
    />
  );
}
