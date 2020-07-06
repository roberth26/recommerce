import React, { HTMLAttributes } from 'react';
import { ProductReview } from '../types';

type StarRatingProps = {
  rating: ProductReview['rating'] | undefined | null;
};

export function StarRating({ rating }: StarRatingProps) {
  if (rating == null) {
    return null;
  }

  return (
    <Root>
      {Array.from(new Array(5))
        .fill(null)
        .map((_, index) => (index <= rating ? '★' : '☆'))}
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
