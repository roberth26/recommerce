import { from, EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType, Epic, combineEpics } from 'redux-observable';
import {
  ActionType,
  receiveUsers,
  RequestUser,
  receiveUser,
  UpdateUser,
  CreateUser,
  DeleteUser,
  RequestUsers,
  userDeleted,
} from './actions';
import * as API from './api';

export const requestUsersEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.REQUEST_USERS),
    mergeMap(({ meta }: RequestUsers) =>
      from(API.getUsers()).pipe(
        mergeMap(res =>
          res.error == null
            ? of(receiveUsers({ users: res.users }, meta))
            : EMPTY
        )
      )
    )
  );

export const requestUserEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.REQUEST_USER),
    mergeMap(({ payload: { userID }, meta }: RequestUser) =>
      from(API.getUser(userID)).pipe(
        mergeMap(res =>
          res.error == null ? of(receiveUser({ user: res.user }, meta)) : EMPTY
        )
      )
    )
  );

export const createUsersEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.CREATE_USER),
    mergeMap(({ payload: { user }, meta }: CreateUser) =>
      from(API.createUser(user)).pipe(
        mergeMap(res =>
          res.error == null ? of(receiveUser({ user: res.user }, meta)) : EMPTY
        )
      )
    )
  );

export const updateUsersEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.UPDATE_USER),
    mergeMap(({ payload: { user }, meta }: UpdateUser) =>
      from(API.updateUser(user)).pipe(
        mergeMap(res =>
          res.error == null ? of(receiveUser({ user: res.user }, meta)) : EMPTY
        )
      )
    )
  );

export const deleteUsersEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionType.DELETE_USER),
    mergeMap(({ payload: { userID }, meta }: DeleteUser) =>
      from(API.deleteUser(userID)).pipe(
        mergeMap(res =>
          res.error == null ? of(userDeleted({ userID }, meta)) : EMPTY
        )
      )
    )
  );

export const epic = combineEpics(
  requestUsersEpic,
  requestUserEpic,
  createUsersEpic,
  updateUsersEpic,
  deleteUsersEpic
);
