import React, { useState, ChangeEventHandler, useEffect } from 'react';
import { uuid } from 'uuidv4';
import { Product } from '../types';
import { ProductCategory } from '../../product-categories/types';
import { Field } from '../../../utils/Field';

type EditableProduct = Pick<
  Product<ProductCategory>,
  'category' | 'name' | 'price' | 'imageURI' | 'description'
>;

type ProductEditorProps = {
  product: Product<ProductCategory> | undefined | null;
  categories: Array<ProductCategory>;
  onProductEdit?: (product: Product<ProductCategory>) => void;
};

export function ProductEditor({
  product,
  categories,
  onProductEdit,
}: ProductEditorProps) {
  const [state, setState] = useState<EditableProduct>(
    getInitialState(product, categories)
  );
  useEffect(() => {
    setState(getInitialState(product, categories));
  }, [product, categories]);

  const isEdit = product != null;
  const handleChange = (
    key: keyof EditableProduct
  ): ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > => changeEvent => {
    const {
      currentTarget: { value },
    } = changeEvent;
    setState(state => ({
      ...state,
      [key]:
        key === 'category'
          ? categories.find(category => category.id === value) || state.category
          : value,
    }));
  };
  const handleConfirmClick = () => {
    const editedProduct: Product<ProductCategory> = {
      ...state,
      id: product?.id ?? uuid(),
      rating: product?.rating ?? null,
    };

    if (editedProduct.category) {
      onProductEdit?.(editedProduct);
    }
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
          ) : key === 'imageURI' ? (
            <input
              id={key}
              value={value as string}
              onChange={handleChange('imageURI')}
            />
          ) : key === 'price' ? (
            <input
              id={key}
              type="number"
              value={value as number}
              onChange={handleChange('price')}
            />
          ) : key === 'category' ? (
            <select
              id={key}
              value={(value as ProductCategory)?.id}
              onChange={handleChange('category')}
              required={true}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          ) : key === 'description' ? (
            <textarea
              id={key}
              value={value as string}
              onChange={handleChange('description')}
            />
          ) : null}
        </Field>
      ))}
      <button onClick={handleConfirmClick}>{isEdit ? 'Save' : 'Create'}</button>
    </section>
  );
}

function getInitialState(
  product: Product<ProductCategory> | undefined | null,
  categories: Array<ProductCategory>
): EditableProduct {
  return {
    name: product?.name ?? '',
    price: product?.price ?? 0,
    category: product?.category ?? categories[0],
    imageURI: product?.imageURI ?? '',
    description: product?.description ?? '',
  };
}
