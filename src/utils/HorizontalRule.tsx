import React, { HTMLAttributes } from 'react';

interface HorizontalRuleProps extends HTMLAttributes<HTMLHRElement> {}

export function HorizontalRule({ style, ...props }: HorizontalRuleProps) {
  return (
    <hr
      style={{ border: 0, borderBottom: '1px solid lightgrey', ...style }}
      {...props}
    />
  );
}
