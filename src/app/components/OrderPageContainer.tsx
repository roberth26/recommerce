import React from 'react';
import { connect } from 'react-redux';
import { OrderID, Order } from '../../orders/types';
import { State } from '../types';
import { getCurrentRouteOrderID } from '../selectors';
import { OrderDetailContainer } from './OrderDetailContainer';
import { Page } from './Page';
import { FullLayout } from './FullLayout';
import { ProductSummary } from '../../products/components/ProductSummary';

type OrderPageProps = {
  orderID: OrderID | undefined | null;
  onOrderDelete?: (order: Order) => void;
};

export function OrderPage({ orderID, onOrderDelete }: OrderPageProps) {
  return (
    <Page>
      <FullLayout>
        <OrderDetailContainer
          orderID={orderID}
          onOrderDelete={onOrderDelete}
          renderProduct={product => <ProductSummary product={product} />}
        />
      </FullLayout>
    </Page>
  );
}

type OrderPageContainerStateProps = Pick<OrderPageProps, 'orderID'>;

type OrderPageContainerDispatchProps = Pick<OrderPageProps, 'onOrderDelete'>;

type OrderPageContainerOwnProps = Omit<
  OrderPageProps,
  keyof OrderPageContainerStateProps | keyof OrderPageContainerDispatchProps
>;

export const OrderPageContainer = connect<
  OrderPageContainerStateProps,
  OrderPageContainerDispatchProps,
  OrderPageContainerOwnProps,
  State
>(state => ({
  orderID: getCurrentRouteOrderID(state),
}))(OrderPage);
