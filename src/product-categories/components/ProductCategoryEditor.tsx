import React, { useState, ChangeEventHandler, useEffect } from 'react';
import { uuid } from 'uuidv4';
import { ProductCategory } from '../types';
import { Field } from '../../utils/Field';
import { NavButton } from '../../utils/NavButton';
import { ActionType as RoutesActionType } from '../../routes/actions';

type EditableProductCategory = Pick<ProductCategory, 'name' | 'slug'>;

type ProductCategoryEditorProps = {
  productCategory?: ProductCategory | null;
  onProductCategoryEdit?: (productCategory: ProductCategory) => void;
};

export function ProductCategoryEditor({
  productCategory,
  onProductCategoryEdit,
}: ProductCategoryEditorProps) {
  const [state, setState] = useState<EditableProductCategory>(
    getInitialState(productCategory)
  );
  useEffect(() => {
    setState(getInitialState(productCategory));
  }, [productCategory]);

  const isEdit = productCategory != null;
  const handleChange =
    (
      key: keyof EditableProductCategory
    ): ChangeEventHandler<HTMLInputElement | HTMLSelectElement> =>
    changeEvent => {
      const {
        currentTarget: { value },
      } = changeEvent;
      setState(state => ({
        ...state,
        [key]: value,
      }));
    };
  const handleConfirmClick = () => {
    const editedProductCategory: ProductCategory = {
      ...state,
      id: productCategory?.id ?? uuid(),
    };

    onProductCategoryEdit?.(editedProductCategory);
  };

  return (
    <section>
      {Object.entries(state).map(([key, value]) => (
        <Field key={key}>
          <label htmlFor={key}>{key}</label>
          {key === 'name' && (
            <input
              id={key}
              value={value as string}
              onChange={handleChange('name')}
            />
          )}
          {key === 'slug' && (
            <input
              id={key}
              value={value as string}
              onChange={handleChange('slug')}
            />
          )}
        </Field>
      ))}
      <NavButton
        to={{
          type: RoutesActionType.PRODUCTS,
          meta: {
            query: {
              productCategory: productCategory?.slug,
            },
          },
        }}
      >
        Cancel
      </NavButton>
      &nbsp;&nbsp;
      <button onClick={() => alert('TODO')}>Delete</button>
      &nbsp;&nbsp;
      <button onClick={handleConfirmClick}>{isEdit ? 'Save' : 'Create'}</button>
    </section>
  );
}

function getInitialState(
  productCategory: ProductCategory | undefined | null
): EditableProductCategory {
  return {
    name: productCategory?.name ?? '',
    slug: productCategory?.slug ?? '',
  };
}
