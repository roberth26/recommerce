import React, { useState, ChangeEventHandler } from 'react';
import { uuid } from 'uuidv4';
import { ProductCategory } from '../types';
import { Field } from '../../utils/Field';

type EditableProductCategory = Pick<ProductCategory, 'name'>;

type ProductCategoryEditorProps = {
  productCategory?: ProductCategory | null;
  onProductCategoryEdit?: (productCategory: ProductCategory) => void;
};

export function ProductCategoryEditor({
  productCategory,
  onProductCategoryEdit,
}: ProductCategoryEditorProps) {
  const [state, setState] = useState<EditableProductCategory>({
    name: productCategory?.name ?? '',
  });
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
          {key === 'name' ? (
            <input
              id={key}
              value={value as string}
              onChange={handleChange('name')}
            />
          ) : null}
        </Field>
      ))}
      {/** TODO: add cancel button */}
      <button onClick={handleConfirmClick}>{isEdit ? 'Save' : 'Create'}</button>
    </section>
  );
}
