import React, {
  ComponentType,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';

interface TableItem {
  id: string;
}

export interface TableColumn<
  TItem extends TableItem,
  TKey extends keyof TItem
> {
  key: TKey;
  header: ReactNode;
  renderCell: ComponentType<{ itemKey: TKey; value: TItem[TKey] }>;
  headerProps?: ThHTMLAttributes<HTMLTableCellElement>;
  cellProps?: TdHTMLAttributes<HTMLTableCellElement>;
}

interface TableProps<TItem extends TableItem, TKey extends keyof TItem> {
  items: Array<TItem>;
  columns: Array<TableColumn<TItem, TKey>>;
}

export function Table<TItem extends TableItem, TKey extends keyof TItem>({
  items,
  columns,
}: TableProps<TItem, TKey>) {
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map(({ key, header, headerProps }) => (
            <Th key={String(key)} {...headerProps}>
              {header}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={item.id}
            style={{
              backgroundColor: index % 2 ? 'rgb(245, 245, 245)' : 'initial',
            }}
          >
            {columns.map(
              ({
                key,
                renderCell: Cell,
                cellProps: { style, ...cellProps } = {},
              }) => (
                <Td key={String(key)} style={style} {...cellProps}>
                  <Cell itemKey={key} value={item[key]} />
                </Td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Th({
  children,
  style,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      style={{
        borderBottom: '1px solid lightgrey',
        padding: 8,
        ...style,
      }}
      {...props}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  style,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td style={{ padding: 8, ...style }} {...props}>
      {children}
    </td>
  );
}
