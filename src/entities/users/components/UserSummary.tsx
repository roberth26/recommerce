import React from 'react';
import { User } from '../types';
import Link from 'redux-first-router-link';
import { ActionType as RoutesActionType } from '../../../routes/actions';

type UserSummaryProps = {
  user: User | undefined | null;
};

export function UserSummary({ user }: UserSummaryProps) {
  if (user == null) {
    return null;
  }

  return (
    <div>
      <Link to={{ type: RoutesActionType.USER, payload: { userID: user.id } }}>
        {user.name}
      </Link>
    </div>
  );
}
