export type UserID = string;

export interface User {
  id: UserID;
  name: string;
}

export interface State {
  byID: Partial<Record<UserID, User>>;
  allIDs: Array<UserID>;
}
