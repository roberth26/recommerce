import { Reducer } from 'redux';
import {
  pipe,
  map,
  uniq,
  omit,
  without,
  keyBy,
  concat,
  values,
  uniqBy,
  orderBy,
  filter,
  groupBy,
  mapValues,
} from 'lodash/fp';
import { State, Order, OrderID } from './types';
import { AnyAction, ActionType } from './actions';
import { initialState } from './constants';
import { normalizeOrder } from './utils';
import { ProductID } from '../products/types';
import { UserID } from '../users/types';

export const reducer: Reducer<State, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.CREATE_ORDER:
    case ActionType.UPDATE_ORDER:
    case ActionType.RECEIVE_ORDER: {
      const {
        payload: { order },
      } = action;
      const orderNormalized = normalizeOrder(order);

      if (
        action.type === ActionType.UPDATE_ORDER &&
        state.byID[orderNormalized.id] == null
      ) {
        return state;
      }

      const byID: typeof state['byID'] = {
        ...state.byID,
        [orderNormalized.id]: orderNormalized,
      };

      const allIDs: typeof state['allIDs'] = pipe(
        values,
        orderBy<Order<ProductID, UserID>>(order => order.createdAt, 'desc'),
        map<Order<ProductID, UserID>, OrderID>(order => order.id)
      )(byID);

      const idsByUserID = pipe(
        values,
        groupBy<Order<ProductID, UserID>>(order => order.user),
        mapValues(map(order => order.id))
      )(byID);

      return {
        ...state,
        byID,
        allIDs,
        idsByUserID,
      };
    }

    case ActionType.ORDER_DELETED: {
      const {
        payload: { orderID },
      } = action;
      const prevOrder = state.byID[orderID];

      if (prevOrder == null) {
        return state;
      }

      const prevOrderIDsForUserID = state.idsByUserID[prevOrder.user];

      return {
        ...state,
        byID: omit(orderID, state.byID),
        allIDs: without([orderID], state.allIDs),
        idsByUserID:
          prevOrderIDsForUserID == null
            ? state.idsByUserID
            : {
                ...state.idsByUserID,
                [prevOrder.user]: without([orderID], prevOrderIDsForUserID),
              },
      };
    }

    case ActionType.RECEIVE_ORDERS: {
      const {
        payload: { orders },
      } = action;
      const ordersNormalized = orders.map(normalizeOrder);

      return {
        ...state,
        byID: {
          ...state.byID,
          ...keyBy(order => order.id, ordersNormalized),
        },
        allIDs: pipe(
          values,
          concat(ordersNormalized),
          uniqBy<Order<ProductID, UserID>>(order => order.id),
          orderBy<Order<ProductID, UserID>>(order => order.createdAt, 'desc'),
          map<Order<ProductID, UserID>, OrderID>(order => order.id)
        )(state.byID),
        idsByUserID: ordersNormalized.reduce((acc, curr) => {
          acc[curr.user] = uniq([...(acc[curr.user] || []), curr.id]);

          return acc;
        }, state.idsByUserID),
      };
    }

    case ActionType.DELETE_ORDERS: {
      const {
        payload: { orderIDs, userID },
      } = action;

      const orderIDSet = new Set(orderIDs);

      const byID = pipe(
        filter<Order<ProductID, UserID>>(
          order =>
            (userID != null ? order.user !== userID : true) &&
            (orderIDs != null ? !orderIDSet.has(order.id) : true)
        ),
        keyBy(order => order.id)
      )(state.byID);

      const idsByUserID = pipe(
        values,
        groupBy<Order<ProductID, UserID>>(order => order.user),
        mapValues(map(order => order.id))
      )(byID);

      return {
        ...state,
        byID,
        idsByUserID,
      };
    }

    default:
      return state;
  }
};
