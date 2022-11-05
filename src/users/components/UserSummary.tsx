import React from 'react';
import { User } from '../types';
import { ActionType as RoutesActionType } from '../../routes/actions';
import { NavLink } from '../../utils/NavLink';

type UserSummaryProps = {
  user: User | undefined | null;
};

export function UserSummary({ user }: UserSummaryProps) {
  if (user == null) {
    return null;
  }

  return (
    <div>
      <NavLink
        to={{ type: RoutesActionType.USER, payload: { userID: user.id } }}
      >
        {user.name}
      </NavLink>
    </div>
  );
}
