import { from, EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType, Epic, combineEpics } from 'redux-observable';
import {
  ActionType,
  receiveOrders,
  RequestOrder,
  receiveOrder,
  UpdateOrder,
  CreateOrder,
  DeleteOrder,
  RequestOrders,
  orderDeleted,
} from './actions';
import * as API from './api';

export const requestOrdersEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.REQUEST_ORDERS),
    mergeMap(({ payload, meta }: RequestOrders) =>
      from(API.getOrders(payload?.userID)).pipe(
        mergeMap(res =>
          res.error == null
            ? of(receiveOrders({ orders: res.orders }, meta))
            : EMPTY
        )
      )
    )
  );

export const requestOrderEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.REQUEST_ORDER),
    mergeMap(({ payload: { orderID }, meta }: RequestOrder) =>
      from(API.getOrder(orderID)).pipe(
        mergeMap(res =>
          res.error == null
            ? of(receiveOrder({ order: res.order }, meta))
            : EMPTY
        )
      )
    )
  );

export const createOrdersEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.CREATE_ORDER),
    mergeMap(({ payload: { order }, meta }: CreateOrder) =>
      from(API.createOrder(order)).pipe(
        mergeMap(res =>
          res.error == null
            ? of(receiveOrder({ order: res.order }, meta))
            : EMPTY
        )
      )
    )
  );

export const updateOrderEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.UPDATE_ORDER),
    mergeMap(({ payload: { order }, meta }: UpdateOrder) =>
      from(API.updateOrder(order)).pipe(
        mergeMap(res =>
          res.error == null ? of(receiveOrder({ order }, meta)) : EMPTY
        )
      )
    )
  );

export const deleteOrdersEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.DELETE_ORDER),
    mergeMap(({ payload: { orderID }, meta }: DeleteOrder) =>
      from(API.deleteOrder(orderID)).pipe(
        mergeMap(res =>
          res.error == null ? of(orderDeleted({ orderID }, meta)) : EMPTY
        )
      )
    )
  );

export const epic = combineEpics(
  requestOrdersEpic,
  requestOrderEpic,
  createOrdersEpic,
  updateOrderEpic,
  deleteOrdersEpic
);
