import { delay } from '../utils/fn';
import * as DB from '../utils/db-mock';
import { UserID, User } from './types';

export async function getUsers(): Promise<
  | {
      users: Array<User>;
      error?: never;
    }
  | { users?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const users = await DB.getAllUsers();

  return {
    users,
  };
}

export async function getUser(
  userID: UserID
): Promise<{ user: User; error?: never } | { user?: never; error: string }> {
  await delay(Math.random() * 2000 + 500);

  const user = await DB.getUser(userID);

  if (user == null) {
    return {
      error: `User id=${userID} not found`,
    };
  }

  return {
    user,
  };
}

export async function createUser(
  user: User
): Promise<
  | {
      user: User;
      error?: never;
    }
  | { user?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  await DB.putUser(user);

  return {
    user,
  };
}

export async function deleteUser(
  userID: UserID
): Promise<{ error?: never } | { error: string }> {
  await delay(Math.random() * 2000 + 500);

  await DB.deleteUser(userID);

  await Promise.all([
    // delete User's Orders
    DB.getAllOrders().then(orders =>
      Promise.all(
        orders
          .filter(order => order.user === userID)
          .map(order => DB.deleteOrder(order.id))
      )
    ),
    // delete User's ProductReviews
    DB.getAllProductReviews().then(productReviews =>
      Promise.all(
        productReviews
          .filter(productReview => productReview.user === userID)
          .map(productReview => DB.deleteProductReview(productReview.id))
      )
    ),
  ]);

  return {};
}

export async function updateUser(
  user: User
): Promise<
  | {
      user: User;
      error?: never;
    }
  | { user?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  await DB.putUser(user);

  return {
    user,
  };
}
