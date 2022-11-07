import React, { Fragment, HTMLAttributes, useState } from 'react';
import { connect } from 'react-redux';
import { ProductReviewID } from '../../product-reviews/types';
import { ProductReviewSummaryContainer } from './ProductReviewSummaryContainer';
import { Product, ProductID } from '../../products/types';
import { State } from '../types';
import {
  getProductReviewIDsByProductID,
  getProductReviewIDsByUserID,
  getProductReviewIDsByProductSlug,
} from '../selectors';
import { UserID } from '../../users/types';
import { ProductReviewEditorContainer } from './ProductReviewEditorContainer';
import { ProductPickerContainer } from './ProductPickerContainer';
import { UserPickerContainer } from './UserPickerContainer';
import { HorizontalRule } from '../../utils/HorizontalRule';

interface ProductReviewListProps {
  productReviewIDs: Array<ProductReviewID>;
}

export function ProductReviewList({
  productReviewIDs,
}: ProductReviewListProps) {
  const [editingProductReviewID, setEditingProductReviewID] =
    useState<ProductReviewID | null>(null);

  if (productReviewIDs.length === 0) {
    return <div>No reviews</div>;
  }

  const cancelProductReviewEdit = () => {
    setEditingProductReviewID(null);
  };

  return (
    <List>
      {productReviewIDs.map((productReviewID, index, { length }) => (
        <Fragment key={productReviewID}>
          <ListItem>
            {productReviewID === editingProductReviewID ? (
              <ProductReviewEditorContainer
                productReviewID={productReviewID}
                onProductReviewEdit={cancelProductReviewEdit}
                onCancel={cancelProductReviewEdit}
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
                    getItemText={user => user.fullName}
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
          {index < length - 1 && <HorizontalRule />}
        </Fragment>
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
        productSlug?: never;
        userID?: never;
      }
    | {
        productID?: never;
        productSlug: Product['slug'] | undefined | null;
        userID?: never;
      }
    | {
        productID?: never;
        productSlug?: never;
        userID: UserID | undefined | null;
      }
  );

export const ProductReviewListContainer = connect<
  ProductReviewListContainerStateProps,
  ProductReviewListContainerDispatchProps,
  ProductReviewListContainerOwnProps,
  State
>((state, { productID, productSlug, userID }) => ({
  productReviewIDs:
    // TODO: these should be sorted by date
    productID != null
      ? getProductReviewIDsByProductID(state, productID)
      : productSlug != null
      ? getProductReviewIDsByProductSlug(state, productSlug)
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
        paddingBottom: 8,
        marginBottom: 16,
        ...style,
      }}
      {...props}
    />
  );
}
