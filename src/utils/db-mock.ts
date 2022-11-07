import { uuid } from 'uuidv4';
import Faker from 'faker';
import { keyBy, pipe, sample, times, uniqBy } from 'lodash/fp';
import { Order } from '../orders/types';
import { ProductID, Product } from '../products/types';
import { UserID, User } from '../users/types';
import {
  ProductCategory,
  ProductCategoryID,
} from '../product-categories/types';
import { ProductReview } from '../product-reviews/types';

export async function openDB() {
  const openDBRequest = window.indexedDB.open('recommerce', 1);

  await new Promise((resolve, reject) => {
    openDBRequest.addEventListener('success', resolve);
    openDBRequest.addEventListener('error', reject);
    openDBRequest.addEventListener('upgradeneeded', () =>
      populateDB(openDBRequest.result).then(resolve)
    );
  });

  return openDBRequest.result;
}

export async function populateDB(db: IDBDatabase) {
  const productCategories = generateProductCategories();
  const products = generateProducts(productCategories);
  const users = generateUsers();
  const orders = generateOrders(products, users);
  const productReviews = generateProductReviews(products, users);

  const stores = Array.of<[string, any[]]>(
    ['orders', orders],
    ['productCategories', productCategories],
    ['productReviews', productReviews],
    ['products', products],
    ['users', users]
  );

  await Promise.all(
    stores.map(([storeName]) =>
      !db.objectStoreNames.contains(storeName)
        ? createObjectStore(db, storeName)
        : null
    )
  );

  await Promise.all(
    stores.map(([storeName, items]) => populateStore(db, storeName, items))
  );
}

export async function createObjectStore(db: IDBDatabase, storeName: string) {
  const store = db.createObjectStore(storeName, { keyPath: 'id' });

  await new Promise((resolve, reject) => {
    store.transaction.addEventListener('complete', resolve);
    store.transaction.addEventListener('error', reject);
  });
}

export function generateOrders(
  products: Array<Product<ProductCategoryID>>,
  users: Array<User>
): Array<Order<ProductID, UserID>> {
  const productsByID = keyBy(product => product.id, products);

  return Array.from(new Array(100))
    .fill(null)
    .map<Order<ProductID, UserID>>(() => {
      const productIDs = Array.from(
        new Array(Math.floor(Math.random() * 5 + 2))
      )
        .fill(null)
        .map<ProductID>(
          () => products[Math.floor(Math.random() * products.length)].id
        );
      const orderedProductIDs = Array.from(
        new Array(Math.floor(Math.random() * 10 + 1))
      )
        .fill(null)
        .map(() => productIDs[Math.floor(Math.random() * productIDs.length)])
        .sort();
      const totalPrice = orderedProductIDs.reduce(
        (acc, curr) => acc + productsByID[curr].price,
        0
      );

      return {
        id: uuid(),
        createdAt: Faker.date.past().toISOString(),
        products: orderedProductIDs,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        user: users[Math.floor(Math.random() * users.length)].id,
      };
    });
}

export function generateProductReviews(
  products: Array<Product<ProductCategoryID>>,
  users: Array<User>
): Array<ProductReview<ProductID, UserID>> {
  return Array.from(new Array(500))
    .fill(null)
    .map<ProductReview<ProductID, UserID>>(() => ({
      id: uuid(),
      rating: Math.floor(Math.random() * 5),
      createdAt: Faker.date.past().toISOString(),
      body: Faker.lorem.paragraph(),
      user: users[Math.floor(Math.random() * users.length)].id,
      product: products[Math.floor(Math.random() * products.length)].id,
    }));
}

export function generateProductCategories(): Array<ProductCategory> {
  return pipe(
    () => Math.floor(Math.random() * 10 + 10),
    times<ProductCategory>(() => {
      const name = Faker.commerce.department();
      return {
        id: uuid(),
        name,
        slug: name.replace(/ /g, '-').toLowerCase(),
      };
    }),
    uniqBy(productCategory => productCategory.name)
  )();
}

export function generateProducts(
  productCategories: Array<ProductCategory>
): Array<Product<ProductCategoryID>> {
  const keywords = ['product', 'car', 'watch', 'jewelry', 'book', 'toy'];
  return Array.from(new Array(100))
    .fill(null)
    .map<Product<ProductCategoryID>>((_, index) => {
      const name = Faker.commerce.productName();
      return {
        id: uuid(),
        slug: name.replace(/ /g, '-').toLowerCase(),
        name,
        price: parseFloat((Math.random() * 100).toFixed(2)),
        category:
          productCategories[
            Math.floor(Math.random() * productCategories.length)
          ].id,
        imageURI: `https://loremflickr.com/480/480/${sample(keywords)}?lock=${
          index + 1
        }`,
        rating: Math.floor(Math.random() * 5),
        description: Faker.lorem.paragraph(),
      };
    });
}

export function generateUsers(): Array<User> {
  return Array.from(new Array(50))
    .fill(null)
    .map<User>(() => {
      const firstName = Faker.name.firstName();
      const lastName = Faker.name.lastName();
      return {
        id: uuid(),
        username: `${firstName
          .replace(/'/g, '')
          .replace(/-/g, '')
          .charAt(0)
          .toLowerCase()}${lastName
          .replace(/'/g, '')
          .replace(/-/g, '')
          .toLowerCase()}`,
        fullName: `${firstName} ${lastName}`,
        email: Faker.internet.email(),
      };
    });
}

export async function populateStore(
  db: IDBDatabase,
  storeName: string,
  items: Array<any>
) {
  const putTransaction = db.transaction(storeName, 'readwrite');
  const store = putTransaction.objectStore(storeName);

  await Promise.all(
    items.map(
      item =>
        new Promise((resolve, reject) => {
          store.transaction.addEventListener('success', resolve);
          store.transaction.addEventListener('error', reject);
          store.put(item);
        })
    )
  );
}

export function getAll<Entity extends { id: string }>(storeName: string) {
  return async function (): Promise<Array<Entity>> {
    const db = await openDB();
    const transaction = db.transaction(storeName, 'readonly');
    const request = transaction.objectStore(storeName).getAll();

    const entities = await new Promise<Array<Entity>>((resolve, reject) => {
      request.addEventListener('success', () => resolve(request.result));
      request.addEventListener('error', reject);
    });

    db.close();

    return entities;
  };
}

export function get<Entity extends { id: string }>(storeName: string) {
  return async function (entityID: Entity['id']): Promise<Entity | null> {
    const db = await openDB();
    const transaction = db.transaction(storeName, 'readonly');
    const request = transaction.objectStore(storeName).get(entityID);

    const entity = await new Promise<Entity | null>((resolve, reject) => {
      request.addEventListener('success', () =>
        resolve(request.result || null)
      );
      request.addEventListener('error', reject);
    });

    db.close();

    return entity;
  };
}

export function put<Entity extends { id: string }>(storeName: string) {
  return async function (entity: Entity): Promise<void> {
    const db = await openDB();
    const transaction = db.transaction(storeName, 'readwrite');
    const request = transaction.objectStore(storeName).put(entity);

    await new Promise((resolve, reject) => {
      request.addEventListener('success', resolve);
      request.addEventListener('error', reject);
    });

    db.close();
  };
}

export function del<Entity extends { id: string }>(storeName: string) {
  return async function (entityID: Entity['id']): Promise<void> {
    const db = await openDB();
    const transaction = db.transaction(storeName, 'readwrite');
    const request = transaction.objectStore(storeName).delete(entityID);

    await new Promise((resolve, reject) => {
      request.addEventListener('success', resolve);
      request.addEventListener('error', reject);
    });

    db.close();
  };
}

export const getAllOrders = getAll<Order<ProductID, UserID>>('orders');
export const getOrder = get<Order<ProductID, UserID>>('orders');
export const putOrder = put<Order<ProductID, UserID>>('orders');
export const deleteOrder = del<Order<ProductID, UserID>>('orders');

export const getAllProductCategories =
  getAll<ProductCategory>('productCategories');
export const getProductCategory = get<ProductCategory>('productCategories');
export const putProductCategory = put<ProductCategory>('productCategories');
export const deleteProductCategory = del<ProductCategory>('productCategories');

export const getAllProductReviews =
  getAll<ProductReview<ProductID, UserID>>('productReviews');
export const getProductReview =
  get<ProductReview<ProductID, UserID>>('productReviews');
export const putProductReview =
  put<ProductReview<ProductID, UserID>>('productReviews');
export const deleteProductReview =
  del<ProductReview<ProductID, UserID>>('productReviews');

export const getAllProducts = getAll<Product<ProductCategoryID>>('products');
export const getProduct = get<Product<ProductCategoryID>>('products');
export const putProduct = put<Product<ProductCategoryID>>('products');
export const deleteProduct = del<Product<ProductCategoryID>>('products');

export const getAllUsers = getAll<User>('users');
export const getUser = get<User>('users');
export const putUser = put<User>('users');
export const deleteUser = del<User>('users');
