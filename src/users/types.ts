export type UserID = string;

export interface User {
  id: UserID;
  username: string;
  fullName: string;
  email: string;
}

export interface State {
  byID: Partial<Record<UserID, User>>;
  allIDs: Array<UserID>;
}
