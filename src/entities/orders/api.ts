import { keyBy } from 'lodash/fp';
import { delay } from '../../utils/fn';
import { getDB } from '../../utils/db-mock';
import { OrderID, Order } from './types';
import { normalizeOrder } from './utils';
import { Product, ProductID } from '../products/types';
import { User, UserID } from '../users/types';
import { ProductCategoryID } from '../product-categories/types';

export async function getOrders(
  userID?: UserID | null
): Promise<
  | { orders: Array<Order<Product<ProductCategoryID>, User>>; error?: never }
  | { orders?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const db = await getDB();
  const [orders, products, users] = await Promise.all([
    db.getAllOrders(),
    db.getAllProducts(),
    db.getAllUsers(),
  ]);

  const productsByID = keyBy(product => product.id, products);
  const usersByID = keyBy(user => user.id, users);

  const filteredOrders = orders
    .filter(order => (userID == null ? true : order.user === userID))
    .map<Order<Product<ProductCategoryID>, User>>(order => ({
      ...order,
      products: order.products.map(
        productID => productsByID[productID] as Product<ProductCategoryID>
      ),
      user: usersByID[order.user],
    }));

  return {
    orders: filteredOrders,
  };
}

export async function getOrder(
  orderID: OrderID
): Promise<
  | { order: Order<Product<ProductCategoryID>, User>; error?: never }
  | { order?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const db = await getDB();
  const order = await db.getOrder(orderID);

  if (order == null) {
    return {
      error: `Order id=${orderID} not found`,
    };
  }

  const [products, user] = await Promise.all([
    db.getAllProducts(),
    db.getUser(order.user),
  ]);

  if (user == null) {
    return {
      error: `User id=${order.user} not found`,
    };
  }

  const productsByID = keyBy(product => product.id, products);

  const orderWithProductsAndUser: Order<Product<ProductCategoryID>, User> = {
    ...order,
    products: order.products.map(productID => productsByID[productID]),
    user,
  };

  return {
    order: orderWithProductsAndUser,
  };
}

export async function createOrder(
  order: Order
): Promise<
  | { order: Order<ProductID, UserID>; error?: never }
  | { order?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const ord = normalizeOrder(order);
  const db = await getDB();
  await db.putOrder(ord);

  return {
    order: ord,
  };
}

export async function deleteOrder(
  orderID: OrderID
): Promise<{ error?: never } | { error: string }> {
  await delay(Math.random() * 2000 + 500);

  const db = await getDB();
  await db.deleteOrder(orderID);

  return {};
}

export async function updateOrder(
  order: Order
): Promise<
  | { order: Order<ProductID, UserID>; error?: never }
  | { order?: never; error: string }
> {
  await delay(Math.random() * 2000 + 500);

  const ord = normalizeOrder(order);
  const db = await getDB();
  await db.putOrder(ord);

  return {
    order: ord,
  };
}
