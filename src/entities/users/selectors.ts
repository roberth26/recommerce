import { createSelector } from 'reselect';
import { pipe, map, compact } from 'lodash/fp';
import { State, UserID } from './types';

export const byID = (state: State) => state.byID;
export const allIDs = (state: State) => state.allIDs;

// public
export const getUserIDs = allIDs;

export const getUsers = createSelector([allIDs, byID], (allIDs, byID) =>
  pipe(
    map((id: UserID) => byID[id]),
    compact
  )(allIDs)
);

export const getUserByID = (state: State, userID: UserID | undefined | null) =>
  (userID && byID(state)[userID]) || null;
