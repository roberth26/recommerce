export type UserID = string;

export type User = {
  id: UserID;
  name: string;
};

export type State = {
  byID: Partial<Record<UserID, User>>;
  allIDs: Array<UserID>;
};
