import { from } from 'rxjs';
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
          res.error == null ? [receiveUsers({ users: res.users }, meta)] : []
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
          res.error == null ? [receiveUser({ user: res.user }, meta)] : []
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
          res.error == null ? [receiveUser({ user: res.user }, meta)] : []
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
          res.error == null ? [receiveUser({ user: res.user }, meta)] : []
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
          res.error == null ? [userDeleted({ userID }, meta)] : []
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
