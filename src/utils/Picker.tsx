import React, { ChangeEventHandler, SelectHTMLAttributes } from 'react';

export interface PickerProps<T> {
  value: string | null;
  items: T[];
  getItemKey: (item: T) => string;
  getItemText: (item: T) => string;
  onChange?: (item: T) => void;
  selectElementAttributes?: Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'value' | 'onChange'
  >;
}

export function Picker<T>({
  value,
  items,
  getItemKey,
  getItemText,
  onChange,
  selectElementAttributes,
}: PickerProps<T>) {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = ({
    currentTarget: { value: selectedItemKey },
  }) => {
    const item = items.find(item => getItemKey(item) === selectedItemKey);
    if (item != null) {
      onChange?.(item);
    }
  };

  return (
    <select
      {...selectElementAttributes}
      value={value ?? ''}
      onChange={handleChange}
    >
      {items.map(item => (
        <option
          key={getItemKey(item)}
          value={getItemKey(item)}
          children={getItemText(item)}
        />
      ))}
    </select>
  );
}
