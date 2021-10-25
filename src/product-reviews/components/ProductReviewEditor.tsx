import React, { useState, ChangeEventHandler, ReactNode } from 'react';
import { uuid } from 'uuidv4';
import { ProductReview } from '../types';
import { Field } from '../../utils/Field';
import { UserID } from '../../users/types';
import { ProductID } from '../../products/types';

type EditableProductReview = Pick<
  ProductReview<ProductID, UserID>,
  'body' | 'rating' | 'user' | 'product'
>;

type ProductReviewEditorProps = {
  productReview?: ProductReview<ProductID, UserID> | null;
  renderUserPicker: (props: {
    userID: UserID;
    onUserChange?: (userID: UserID) => void;
  }) => ReactNode;
  renderProductPicker: (props: {
    productID: ProductID;
    onProductChange?: (productID: ProductID) => void;
  }) => ReactNode;
  onProductReviewEdit?: (
    productReview: ProductReview<ProductID, UserID>
  ) => void;
};

export function ProductReviewEditor({
  productReview,
  renderUserPicker,
  renderProductPicker,
  onProductReviewEdit,
}: ProductReviewEditorProps) {
  const [state, setState] = useState<EditableProductReview>({
    body: productReview?.body ?? '',
    rating: productReview?.rating ?? 0,
    user: productReview?.user ?? 'PLACEHOLDER_ID',
    product: productReview?.product ?? 'PLACEHOLDER_ID',
  });
  const isEdit = productReview != null;
  const handleChange =
    (
      key: keyof EditableProductReview
    ): ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > =>
    changeEvent => {
      const {
        currentTarget: { value },
      } = changeEvent;
      setState(state => ({
        ...state,
        [key]: key === 'rating' ? Number(value) : value,
      }));
    };
  const handleUserChange = (user: UserID) => {
    setState(state => ({
      ...state,
      user,
    }));
  };
  const handleProductChange = (product: ProductID) => {
    setState(state => ({
      ...state,
      product,
    }));
  };
  const handleConfirmClick = () => {
    const editedProductReview: ProductReview<ProductID, UserID> = {
      id: productReview?.id ?? uuid(),
      createdAt: productReview?.createdAt ?? new Date().toISOString(),
      ...state,
    };

    onProductReviewEdit?.(editedProductReview);
  };

  return (
    <section>
      {Object.entries(state).map(([key, value]) => (
        <Field key={key}>
          <label htmlFor={key}>{key}</label>
          {key === 'body' ? (
            <textarea
              id={key}
              value={value as string}
              onChange={handleChange('body')}
            />
          ) : key === 'rating' ? (
            <select
              id={key}
              value={value as number}
              onChange={handleChange('rating')}
            >
              {Array.from(Array(6), (_, index) => (
                <option key={index} value={index} children={index} />
              ))}
            </select>
          ) : key === 'user' ? (
            renderUserPicker({
              userID: state.user,
              onUserChange: handleUserChange,
            })
          ) : key === 'product' ? (
            renderProductPicker({
              productID: state.product,
              onProductChange: handleProductChange,
            })
          ) : null}
        </Field>
      ))}
      <button onClick={handleConfirmClick}>{isEdit ? 'Save' : 'Create'}</button>
    </section>
  );
}
