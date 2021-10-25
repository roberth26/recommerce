import React, { HTMLAttributes, useState } from 'react';
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
import { ProductReviewEditorContainer } from './ProductReviewEditorContainer';
import { ProductPickerContainer } from './ProductPickerContainer';
import { UserPickerContainer } from './UserPickerContainer';

type ProductReviewListProps = {
  productReviewIDs: Array<ProductReviewID>;
};

export function ProductReviewList({
  productReviewIDs,
}: ProductReviewListProps) {
  const [
    editingProductReviewID,
    setEditingProductReviewID,
  ] = useState<ProductReviewID | null>(null);

  if (productReviewIDs.length === 0) {
    return <div>No reviews</div>;
  }

  const handleProductReviewEdit = () => {
    setEditingProductReviewID(null);
  };

  return (
    <List>
      {productReviewIDs.map(productReviewID => (
        <ListItem key={productReviewID}>
          {productReviewID === editingProductReviewID ? (
            <ProductReviewEditorContainer
              productReviewID={productReviewID}
              onProductReviewEdit={handleProductReviewEdit}
              renderProductPicker={({ productID, onProductChange }) => (
                <ProductPickerContainer
                  value={productID}
                  getItemKey={product => product.id}
                  getItemText={product => product.name}
                  onChange={product => onProductChange?.(product.id)}
                />
              )}
              renderUserPicker={({ userID, onUserChange }) => (
                <UserPickerContainer
                  value={userID}
                  getItemKey={user => user.id}
                  getItemText={user => user.name}
                  onChange={user => onUserChange?.(user.id)}
                />
              )}
            />
          ) : (
            <ProductReviewSummaryContainer
              productReviewID={productReviewID}
              onEdit={() => setEditingProductReviewID(productReviewID)}
            />
          )}
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
