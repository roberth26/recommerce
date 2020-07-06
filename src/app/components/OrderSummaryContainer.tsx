import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { OrderSummary } from '../../orders/components/OrderSummary';
import { State } from '../types';
import { getOrderByIDDenormalized } from '../selectors';
import { OrderID } from '../../orders/types';

type OrderSummaryProps = ComponentProps<typeof OrderSummary>;

type OrderSummaryContainerStateProps = Pick<OrderSummaryProps, 'order'>;

type OrderSummaryContainerDispatchProps = {};

type OrderSummaryContainerOwnProps = Omit<
  OrderSummaryProps,
  | keyof OrderSummaryContainerStateProps
  | keyof OrderSummaryContainerDispatchProps
> & {
  orderID: OrderID;
};

export const OrderSummaryContainer = connect<
  OrderSummaryContainerStateProps,
  OrderSummaryContainerDispatchProps,
  OrderSummaryContainerOwnProps,
  State
>((state, { orderID }) => ({
  order: getOrderByIDDenormalized(state, orderID),
}))(OrderSummary);
