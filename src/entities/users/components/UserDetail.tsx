import React from 'react';
import { User } from '../types';

type UserDetailProps = {
  user: User | undefined | null;
  onUserDelete?: (user: User) => void;
};

export function UserDetail({ user, onUserDelete }: UserDetailProps) {
  if (user == null) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => {
          if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            onUserDelete?.(user);
          }
        }}
      >
        Delete
      </button>
      <h2>{user.name}</h2>
    </div>
  );
}
