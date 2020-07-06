import { Reducer } from 'redux';
import {
  pipe,
  map,
  omit,
  without,
  keyBy,
  concat,
  values,
  sortBy,
  uniqBy,
} from 'lodash/fp';
import { State, User } from './types';
import { AnyAction, ActionType } from './actions';
import { initialState } from './constants';

export const reducer: Reducer<State, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.CREATE_USER:
    case ActionType.UPDATE_USER:
    case ActionType.RECEIVE_USER: {
      const {
        payload: { user },
      } = action;

      if (action.type === ActionType.UPDATE_USER && state.byID[user.id]) {
        return state;
      }

      const byID: typeof state['byID'] = {
        ...state.byID,
        [user.id]: user,
      };

      const allIDs: typeof state['allIDs'] = pipe(
        values,
        sortBy<User>(user => user.name),
        map(user => user.id)
      )(byID);

      return {
        ...state,
        byID,
        allIDs,
      };
    }

    case ActionType.RECEIVE_USERS:
      return {
        ...state,
        byID: {
          ...state.byID,
          ...keyBy(user => user.id, action.payload.users),
        },
        allIDs: pipe(
          values,
          concat(action.payload.users),
          uniqBy(user => user.id),
          sortBy(user => user.name),
          map(user => user.id)
        )(state.byID),
      };

    case ActionType.USER_DELETED:
      return {
        ...state,
        byID: omit(action.payload.userID, state.byID),
        allIDs: without([action.payload.userID], state.allIDs),
      };

    default:
      return state;
  }
};
