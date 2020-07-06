import React, { HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { ProductReviewID } from '../../product-reviews/types';
import { ProductReviewSummaryContainer } from './ProductReviewSummaryContainer';
import { ProductID } from '../../products/types';
import { State } from '../types';
import {
  getProductReviewIDsByProductID,
  getProductReviewIDsByUserID,
} from '../selectors';
import { UserID } from '../../users/types';

type ProductReviewListProps = {
  productReviewIDs: Array<ProductReviewID>;
};

export function ProductReviewList({
  productReviewIDs,
}: ProductReviewListProps) {
  if (productReviewIDs.length === 0) {
    return <div>No reviews</div>;
  }

  return (
    <List>
      {productReviewIDs.map(productReviewID => (
        <ListItem key={productReviewID}>
          <ProductReviewSummaryContainer productReviewID={productReviewID} />
        </ListItem>
      ))}
    </List>
  );
}

type ProductReviewListContainerStateProps = Pick<
  ProductReviewListProps,
  'productReviewIDs'
>;

type ProductReviewListContainerDispatchProps = Pick<
  ProductReviewListProps,
  never
>;

type ProductReviewListContainerOwnProps = Omit<
  ProductReviewListProps,
  | keyof ProductReviewListContainerStateProps
  | keyof ProductReviewListContainerDispatchProps
> &
  (
    | {
        productID: ProductID | undefined | null;
        userID?: never;
      }
    | {
        productID?: never;
        userID: UserID | undefined | null;
      }
  );

export const ProductReviewListContainer = connect<
  ProductReviewListContainerStateProps,
  ProductReviewListContainerDispatchProps,
  ProductReviewListContainerOwnProps,
  State
>((state, { productID, userID }) => ({
  productReviewIDs:
    productID != null
      ? getProductReviewIDsByProductID(state, productID)
      : getProductReviewIDsByUserID(state, userID),
}))(ProductReviewList);

export function List({ style, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        ...style,
      }}
      {...props}
    />
  );
}

export function ListItem({ style, ...props }: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      style={{
        borderBottom: '1px solid lightgrey',
        paddingBottom: 8,
        marginBottom: 16,
        ...style,
      }}
      {...props}
    />
  );
}
