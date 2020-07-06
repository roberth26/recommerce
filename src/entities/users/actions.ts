import { UserID, User } from './types';

export enum ActionType {
  REQUEST_USERS = '@@users/REQUEST_USERS',
  REQUEST_USER = '@@users/REQUEST_USER',
  RECEIVE_USERS = '@@users/RECEIVE_USERS',
  RECEIVE_USER = '@@users/RECEIVE_USER',
  CREATE_USER = '@@users/CREATE_USER',
  UPDATE_USER = '@@users/UPDATE_USER',
  DELETE_USER = '@@users/DELETE_USER',
  USER_DELETED = '@@users/USER_DELETED',
}

export type RequestUsers = {
  type: ActionType.REQUEST_USERS;
  meta?: {
    id: string;
  };
};

export function requestUsers(meta?: RequestUsers['meta']): RequestUsers {
  return {
    type: ActionType.REQUEST_USERS,
    meta,
  };
}

export type RequestUser = {
  type: ActionType.REQUEST_USER;
  payload: {
    userID: UserID;
  };
  meta?: {
    id: string;
  };
};

export function requestUser(
  payload: RequestUser['payload'],
  meta?: RequestUser['meta']
): RequestUser {
  return {
    type: ActionType.REQUEST_USER,
    payload,
    meta,
  };
}

export type ReceiveUsers = {
  type: ActionType.RECEIVE_USERS;
  payload: {
    users: Array<User>;
  };
  meta?: {
    id: string;
  };
};

export function receiveUsers(
  payload: ReceiveUsers['payload'],
  meta?: ReceiveUsers['meta']
): ReceiveUsers {
  return {
    type: ActionType.RECEIVE_USERS,
    payload,
    meta,
  };
}

export type ReceiveUser = {
  type: ActionType.RECEIVE_USER;
  payload: {
    user: User;
  };
  meta?: {
    id: string;
  };
};

export function receiveUser(
  payload: ReceiveUser['payload'],
  meta?: ReceiveUser['meta']
): ReceiveUser {
  return {
    type: ActionType.RECEIVE_USER,
    payload,
    meta,
  };
}

export type CreateUser = {
  type: ActionType.CREATE_USER;
  payload: {
    user: User;
  };
  meta?: {
    id: string;
  };
};

export function createUser(
  payload: CreateUser['payload'],
  meta?: CreateUser['meta']
): CreateUser {
  return {
    type: ActionType.CREATE_USER,
    payload,
    meta,
  };
}

export type UpdateUser = {
  type: ActionType.UPDATE_USER;
  payload: {
    user: User;
  };
  meta?: {
    id: string;
  };
};

export function updateUser(
  payload: UpdateUser['payload'],
  meta?: UpdateUser['meta']
): UpdateUser {
  return {
    type: ActionType.UPDATE_USER,
    payload,
    meta,
  };
}

export type DeleteUser = {
  type: ActionType.DELETE_USER;
  payload: {
    userID: UserID;
  };
  meta?: {
    id: string;
  };
};

export function deleteUser(
  payload: DeleteUser['payload'],
  meta?: DeleteUser['meta']
): DeleteUser {
  return {
    type: ActionType.DELETE_USER,
    payload,
    meta,
  };
}

export type UserDeleted = {
  type: ActionType.USER_DELETED;
  payload: {
    userID: UserID;
  };
  meta?: {
    id: string;
  };
};

export function userDeleted(
  payload: UserDeleted['payload'],
  meta?: UserDeleted['meta']
): UserDeleted {
  return {
    type: ActionType.USER_DELETED,
    payload,
    meta,
  };
}

export type AnyAction =
  | RequestUsers
  | RequestUser
  | ReceiveUsers
  | ReceiveUser
  | CreateUser
  | UpdateUser
  | DeleteUser
  | UserDeleted;
