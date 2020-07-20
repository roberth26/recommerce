import { delay } from '../utils/fn';
import { getDB } from '../utils/db-mock';
import { UserID, User } from './types';

export async function getUsers(): Promise<
  | {
      users: Array<User>;
      error?: never;
    }
  | { users?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const db = await getDB();
  const users = await db.getAllUsers();

  return {
    users,
  };
}

export async function getUser(
  userID: UserID
): Promise<{ user: User; error?: never } | { user?: never; error: string }> {
  await delay(Math.random() * 2000 + 500);

  const db = await getDB();
  const user = await db.getUser(userID);

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

  const db = await getDB();
  await db.putUser(user);

  return {
    user,
  };
}

export async function deleteUser(
  userID: UserID
): Promise<{ error?: never } | { error: string }> {
  await delay(Math.random() * 2000 + 500);

  const db = await getDB();
  await db.deleteUser(userID);

  await Promise.all([
    // delete User's Orders
    db
      .getAllOrders()
      .then(orders =>
        Promise.all(
          orders
            .filter(order => order.user === userID)
            .map(order => db.deleteOrder(order.id))
        )
      ),
    // delete User's ProductReviews
    db
      .getAllProductReviews()
      .then(productReviews =>
        Promise.all(
          productReviews
            .filter(productReview => productReview.user === userID)
            .map(productReview => db.deleteProductReview(productReview.id))
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

  const db = await getDB();
  await db.putUser(user);

  return {
    user,
  };
}
