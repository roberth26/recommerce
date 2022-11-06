import React from 'react';
import { User } from '../types';

interface UserDetailProps {
  user: User | undefined | null;
  onUserDelete?: (user: User) => void;
}

export function UserDetail({ user, onUserDelete }: UserDetailProps) {
  if (user == null) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => {
          if (
            window.confirm(`Are you sure you want to delete ${user.username}?`)
          ) {
            onUserDelete?.(user);
          }
        }}
      >
        Delete
      </button>
      <h2>{user.fullName}</h2>
      <h4>ID</h4>
      {user.id}
      <h4>Username</h4>
      {user.username}
      <h4>Fullname</h4>
      {user.fullName}
      <h4>Email</h4>
      {user.email}
    </div>
  );
}
