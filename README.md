What is recommerce
Recommerce is an ecommerce store. Sort of. I wanted to pick a project that was well understood. The app displays products, categories. More of an "administrator" app than consumer. Doesn't offer buy buttons, cart, etc. Allows crud operations on the various entities, no permissions. BLah blah

Product:

### The Entities
#### User
```typescript
type UserID = string;

type User = {
  id: UserID;
  name: string;
};
```
A `User` posts `ProductReview`s and makes `Order`s.

#### ProductCategory
```typescript
type ProductCategoryID = string;

type ProductCategory = {
  id: ProductCategoryID;
  name: string;
};
```
A `ProductCategory` is applied to a `Product`.

#### Product
```typescript
type ProductID = string;

type Product<
  TCategory extends ProductCategoryID | ProductCategory =
    | ProductCategoryID
    | ProductCategory
> = {
  id: ProductID;
  name: string;
  price: number;
  category: TCategory | null;
  imageURI: string;
  rating: number | null;
  description: string;
};
```
A `Product` has a `ProductCategoryID` or a `ProductCategory`.

#### Order
```typescript
type OrderID = string;

type Order<
  TProduct extends ProductID | Product<ProductCategoryID | ProductCategory> =
    | ProductID
    | Product<ProductCategoryID | ProductCategory>,
  TUser extends UserID | User = UserID | User
> = {
  id: OrderID;
  createdAt: string;
  products: Array<TProduct>;
  totalPrice: number;
  user: TUser;
};
```
An `Order` contains a list of `ProductID`s or `Product`s, and a `UserID` or `User`.

#### ProductReview
```typescript
type ProductReviewID = string;

type ProductReview<
  TProduct extends ProductID | Product<ProductCategoryID | ProductCategory> =
    | ProductID
    | Product<ProductCategoryID | ProductCategory>,
  TUser extends UserID | User = UserID | User
> = {
  id: ProductReviewID;
  rating: number;
  createdAt: string;
  body: string;
  product: TProduct;
  user: TUser;
};
```
A `ProductReview` has a `ProductID` or `Product`, and a `UserID` or `User`.

### TypeScript Generics
Usually an API caters to the client by "joining"/"nesting" related entities in order to reduce requests to the API. Some endpoints should provide normalized "shallow" entities, and some should provide deeply nested entity graphs —it varies. With generics, we can accurately model an entity graph with arbitrary depths for all edges.

Lets use the `Order` type as an example. Blah blah talk about exact data requirements for a component, reducer, and api interface.

I'll admit the generics syntax could get pretty unwieldy when there's many relationships, or for some reason we need to model a deep graph (rare).

### The APIs
There is an `api.ts` file for each entity module, where functions interface with the entity's API. As this is a demo project, there are no APIs. These functions issue local requests to the IndexedDB database in the browser instead of HTTP requests to a remote API. Observe the interfaces of these functions, but understand their bodies are simulated for demo reasons.




didn't create many abstractions for DRY, wanted to keep patterns obvious. lots of copy-paste

Entity-first
normalized/denormalized types
functions/components can define precisely the "completeness" of data they require

folder structure
by-domain
no dependencies on app, prevents circular dependency
no run-time deps on other entity packages
potentially create redux binding packages for each ent, eg redux-products
domain-scoped selectors, selectFromRoot()
containers have to be in app, by definition

redux app, react as view layer
view can be swapped out
side effects in middleware

connect - keeping components reusable
typescript props, stateprops, dispatchprops etc

redux state
"database", with indexes/jointables (correct analogies?)
normalized, deduplication
computation like sorting on write, as reading is far more frequent
reducers should only prpduce new references when absolutely necessary. i didn't worry about this and opted for declarative fp code
memoized selectors - can I do better?
no network request state, for simplicity. therefore no loading states, "no products"

indexedb, first time using
wanted to simulate the apis/databases
prosmisified all indexeddb operations
"api" file makes requests to indexdb instead of network requests
arbitrary slowness added for realism
populated with randomly generated data on initial "api request"
deleted entities,eg when a User is deleted, its ProductReviews and Orders are deleted, for simplicity

redux-observable for side-effects
wanted to learn it/try it for first time
love the functional style
used sagas for 3 years
saga pattern (orchestration), app/effects is the orchestrator, domain effects are de-coupled

functional lodash

redux-first-router

styling - minimalism, only functional styles
created styled primitives using inline styles





