import React, { useState, ChangeEventHandler, useEffect } from 'react';
import { uuid } from 'uuidv4';
import { Product } from '../types';
import { ProductCategory } from '../../product-categories/types';
import { Field } from '../../utils/Field';
import { Picker } from '../../utils/Picker';

type EditableProduct = Pick<
  Product<ProductCategory>,
  'category' | 'name' | 'price' | 'imageURI' | 'description' | 'slug'
>;

interface ProductEditorProps {
  product: Product<ProductCategory> | undefined | null;
  productCategories: Array<ProductCategory>;
  onProductEdit?: (product: Product<ProductCategory>) => void;
  onCancel?: () => void;
}

export function ProductEditor({
  product,
  productCategories,
  onProductEdit,
  onCancel,
}: ProductEditorProps) {
  const [state, setState] = useState<EditableProduct>(
    getInitialState(product, productCategories)
  );
  useEffect(() => {
    setState(getInitialState(product, productCategories));
  }, [product, productCategories]);

  const isEdit = product != null;
  const handleChange =
    (
      key: keyof EditableProduct
    ): ChangeEventHandler<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    > =>
    changeEvent => {
      const {
        currentTarget: { value },
      } = changeEvent;
      setState(state => ({
        ...state,
        [key]: value,
      }));
    };
  const handleCategoryChange = (productCategory: ProductCategory) => {
    setState(state => ({
      ...state,
      category: productCategory,
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
            <Picker
              value={(value as ProductCategory | null)?.id ?? ''}
              items={productCategories}
              getItemKey={productCategory => productCategory.id}
              getItemText={productCategory => productCategory.name}
              onChange={handleCategoryChange}
              selectElementAttributes={{ id: key, required: true }}
            />
          ) : key === 'description' ? (
            <textarea
              id={key}
              value={value as string}
              onChange={handleChange('description')}
            />
          ) : null}
        </Field>
      ))}
      <br />
      <button onClick={onCancel}>Cancel</button>
      &nbsp;&nbsp;
      <button onClick={handleConfirmClick}>{isEdit ? 'Save' : 'Create'}</button>
    </section>
  );
}

function getInitialState(
  product: Product<ProductCategory> | undefined | null,
  productCategories: Array<ProductCategory>
): EditableProduct {
  return {
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    price: product?.price ?? 0,
    category: product?.category ?? productCategories[0],
    imageURI: product?.imageURI ?? '',
    description: product?.description ?? '',
  };
}
