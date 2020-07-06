import React from 'react';
import { connect } from 'react-redux';
import { OrderID, Order } from '../../entities/orders/types';
import { State } from '../types';
import { getCurrentRouteOrderID } from '../selectors';
import { OrderDetailContainer } from './OrderDetailContainer';
import { Page } from './Page';
import { FullLayout } from './FullLayout';

type OrderScreenProps = {
  orderID: OrderID | undefined | null;
  onOrderDelete?: (order: Order) => void;
};

export function OrderScreen({ orderID, onOrderDelete }: OrderScreenProps) {
  return (
    <Page>
      <FullLayout>
        <OrderDetailContainer orderID={orderID} onOrderDelete={onOrderDelete} />
      </FullLayout>
    </Page>
  );
}

type OrderScreenContainerStateProps = Pick<OrderScreenProps, 'orderID'>;

type OrderScreenContainerDispatchProps = Pick<
  OrderScreenProps,
  'onOrderDelete'
>;

type OrderScreenContainerOwnProps = Omit<
  OrderScreenProps,
  keyof OrderScreenContainerStateProps | keyof OrderScreenContainerDispatchProps
>;

export const OrderScreenContainer = connect<
  OrderScreenContainerStateProps,
  OrderScreenContainerDispatchProps,
  OrderScreenContainerOwnProps,
  State
>(state => ({
  orderID: getCurrentRouteOrderID(state),
}))(OrderScreen);
