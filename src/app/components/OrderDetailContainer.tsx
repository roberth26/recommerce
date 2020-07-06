import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { OrderDetail } from '../../entities/orders/components/OrderDetail';
import { State } from '../types';
import { getOrderByIDDenormalized } from '../selectors';
import { OrderID } from '../../entities/orders/types';
import { deleteOrder } from '../../entities/orders/actions';

type OrderDetailProps = ComponentProps<typeof OrderDetail>;

type OrderDetailContainerStateProps = Pick<OrderDetailProps, 'order'>;

type OrderDetailContainerDispatchProps = Required<
  Pick<OrderDetailProps, 'onOrderDelete'>
>;

type OrderDetailContainerOwnProps = Omit<
  OrderDetailProps,
  | keyof OrderDetailContainerStateProps
  | keyof Omit<OrderDetailContainerDispatchProps, 'onOrderDelete'>
> & {
  orderID: OrderID | undefined | null;
};

export const OrderDetailContainer = connect<
  OrderDetailContainerStateProps,
  OrderDetailContainerDispatchProps,
  OrderDetailContainerOwnProps,
  State
>(
  (state, { orderID }) => ({
    order: getOrderByIDDenormalized(state, orderID),
  }),
  (dispatch, { onOrderDelete }) => ({
    onOrderDelete: order => {
      dispatch(deleteOrder({ orderID: order.id }));
      onOrderDelete?.(order);
    },
  })
)(OrderDetail);
