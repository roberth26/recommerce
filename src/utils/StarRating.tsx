import React, { HTMLAttributes } from 'react';

interface StarRatingProps {
  rating: number | undefined | null;
}

export function StarRating({ rating }: StarRatingProps) {
  if (rating == null) {
    return null;
  }

  return (
    <Root>
      {Array.from(new Array(5), (_, index) => (index < rating ? '★' : '☆'))}
    </Root>
  );
}

export function Root({ style, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', ...style }}
      {...props}
    />
  );
}
