import { OrderID, Order } from './types';
import { UserID } from '../users/types';

export enum ActionType {
  REQUEST_ORDERS = '@@orders/REQUEST_ORDERS',
  REQUEST_ORDER = '@@orders/REQUEST_ORDER',
  RECEIVE_ORDERS = '@@orders/RECEIVE_ORDERS',
  RECEIVE_ORDER = '@@orders/RECEIVE_ORDER',
  CREATE_ORDER = '@@orders/CREATE_ORDER',
  UPDATE_ORDER = '@@orders/UPDATE_ORDER',
  DELETE_ORDER = '@@orders/DELETE_ORDER',
  ORDER_DELETED = '@@orders/ORDER_DELETED',
}

export type RequestOrders = {
  type: ActionType.REQUEST_ORDERS;
  payload?: {
    userID?: UserID | null;
  };
  meta?: {
    id: string;
  };
};

export function requestOrders(
  payload?: RequestOrders['payload'],
  meta?: RequestOrders['meta']
): RequestOrders {
  return {
    type: ActionType.REQUEST_ORDERS,
    payload,
    meta,
  };
}

export type RequestOrder = {
  type: ActionType.REQUEST_ORDER;
  payload: {
    orderID: OrderID;
  };
  meta?: {
    id: string;
  };
};

export function requestOrder(
  payload: RequestOrder['payload'],
  meta?: RequestOrder['meta']
): RequestOrder {
  return {
    type: ActionType.REQUEST_ORDER,
    payload,
    meta,
  };
}

export type ReceiveOrders = {
  type: ActionType.RECEIVE_ORDERS;
  payload: {
    orders: Array<Order>;
  };
  meta?: {
    id: string;
  };
};

export function receiveOrders(
  payload: ReceiveOrders['payload'],
  meta?: ReceiveOrders['meta']
): ReceiveOrders {
  return {
    type: ActionType.RECEIVE_ORDERS,
    payload,
    meta,
  };
}

export type ReceiveOrder = {
  type: ActionType.RECEIVE_ORDER;
  payload: {
    order: Order;
  };
  meta?: {
    id: string;
  };
};

export function receiveOrder(
  payload: ReceiveOrder['payload'],
  meta?: ReceiveOrder['meta']
): ReceiveOrder {
  return {
    type: ActionType.RECEIVE_ORDER,
    payload,
    meta,
  };
}

export type CreateOrder = {
  type: ActionType.CREATE_ORDER;
  payload: {
    order: Order;
  };
  meta?: {
    id: string;
  };
};

export function createOrder(
  payload: CreateOrder['payload'],
  meta?: CreateOrder['meta']
): CreateOrder {
  return {
    type: ActionType.CREATE_ORDER,
    payload,
    meta,
  };
}

export type UpdateOrder = {
  type: ActionType.UPDATE_ORDER;
  payload: {
    order: Order;
  };
  meta?: {
    id: string;
  };
};

export function updateOrder(
  payload: UpdateOrder['payload'],
  meta?: UpdateOrder['meta']
): UpdateOrder {
  return {
    type: ActionType.UPDATE_ORDER,
    payload,
    meta,
  };
}

export type DeleteOrder = {
  type: ActionType.DELETE_ORDER;
  payload: {
    orderID: OrderID;
  };
  meta?: {
    id: string;
  };
};

export function deleteOrder(
  payload: DeleteOrder['payload'],
  meta?: DeleteOrder['meta']
): DeleteOrder {
  return {
    type: ActionType.DELETE_ORDER,
    payload,
    meta,
  };
}

export type OrderDeleted = {
  type: ActionType.ORDER_DELETED;
  payload: {
    orderID: OrderID;
  };
  meta?: {
    id: string;
  };
};

export function orderDeleted(
  payload: OrderDeleted['payload'],
  meta?: OrderDeleted['meta']
): OrderDeleted {
  return {
    type: ActionType.ORDER_DELETED,
    payload,
    meta,
  };
}

export type AnyAction =
  | RequestOrders
  | RequestOrder
  | ReceiveOrders
  | ReceiveOrder
  | CreateOrder
  | UpdateOrder
  | DeleteOrder
  | OrderDeleted;
