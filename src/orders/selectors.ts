import { createSelector } from 'reselect';
import { pipe, map, compact } from 'lodash/fp';
import { UserID } from '../users/types';
import { State, OrderID } from './types';

export const byID = (state: State) => state.byID;
export const allIDs = (state: State) => state.allIDs;
export const idsByUserID = (state: State) => state.idsByUserID;

// public
export const getOrderIDs = allIDs;

export const getOrders = createSelector([allIDs, byID], (allIDs, byID) =>
  pipe(
    map((id: OrderID) => byID[id]),
    compact
  )(allIDs)
);

export const getOrderByID = (
  state: State,
  orderID: OrderID | undefined | null
) => (orderID && byID(state)[orderID]) || null;

export const getOrderIDsByUserID = (
  state: State,
  userID: UserID | undefined | null
) => (userID && idsByUserID(state)[userID]) || [];
