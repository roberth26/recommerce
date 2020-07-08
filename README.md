

intro<<<<<>>>>>

### Redux First
I prefer to build Redux apps, with React acting as the view layer. I think of a web app in terms of entities, relationships, state transitions, and side effects. The view is a visual representation of the app's state, as well as an actor (the user), able to emit events. The app can respond to these events by enacting a state transition, or by affecting the outside world by yielding side-effects.

Redux is a tiny library, but it establishes a straight-forward and highly scalable architectural pattern.

### Aside on Boilerplate
I'm not bothered by the verbose code a Redux app tends to have. TypeScript makes it even *more* verbose, and I'm still fine with it. In this example project, I refrained from using or creating abstractions for the sake of DRYness, in order to keep the patterns unmistakable. I copy-pasted **a lot**, and I think that's a good sign.

### The Example Project
Recommerce is a semi-functional ecommerce store. The user can browse and manage products, categories, reviews, orders, and users. My goal is not to demonstrate how to build a great shopping experience. Instead I chose an ecosystem of entities that are universally understood. The user cannot purchase products--there is no cart. The user is a sort of admin or "superuser" with the ability to create, edit, and delete entities.

TALK ABOUT SCALABILITY

### The APIs
There is an `api.ts` file for each entity module, where functions interface with the entity's API. As this is an example project, there are no APIs. These functions issue local requests to the IndexedDB database in the browser instead of HTTP requests to a remote API. Observe the interfaces of these functions, but understand their bodies are simulated for demonstration purposes.

### Folder Structure
I prefer to organize by domain rather than by type. Within a domain I then organize by type: constants, types, utils, components, etc.

Recommerce is broken into an `app` module, 5 entity modules, a `routes` module, and a `utils` module.

#### App Module
The `app` module--wait for it--*is* the application. It bootstraps the application, and forks the thread-like middleware provided by the modules. It composes the other modules and orchestrates between them. It also delegates to the other modules.
`app` depends on the other modules, but they do not depend on it (the other modules do not import from `app`). I've found this to be a good strategy in avoiding circular dependency issues. It also produces reuseable, app-agnostic modules. Database tables and APIs are likely to be reused by applications.

`app` defines the root-level `State` type of the Redux store. It does so by composing the `State` types of the other modules into a tree. Only `app` knows the shape of the top-level state tree. It does not need to know the shape of its branches.

```typescript
type State = {
  productCategories: ProductCategoriesState;
  productReviews: ProductReviewsState;
  products: ProductsState;
  users: UsersState;
  orders: OrdersState;
  routes: RoutesState;
};
```

In a similar manner, `app` defines the root reducer by composing the reducers of the other modules.

```typescript
const rootReducer = combineReducers<State>({
  productCategories: productCategoriesReducer,
  productReviews: productReviewsReducer,
  products: productsReducer,
  users: usersReducer,
  orders: ordersReducer,
  routes: routesReducer,
});
```




#### Entity Modules
The entity modules do not know the shape of the top-level tree.
These boundaries shield the modules from changes to the other modules. Entity-level selectors and reducers can only operate on their respective slice of state. Entity-level side-effects (Redux middleware) only respond to their own Redux actions. An entity module is independent, and a person or team can scale relentlessly within their domain as long as they don't breach the boundaries.

##### Composing Selectors
Entity selectors operate *only* on their respective branch of state.

```typescript
function selectFromRoot(sliceSelector, localSelector) {
  return (state, ...args) =>
    localSelector(sliceSelector(state), ...args);
}
```
(I removed the type annotations for clarity.)


### The Entities
#### User
```typescript
type UserID = string;

type User = {
  id: UserID;
  name: string;
};
```

#### ProductCategory
```typescript
type ProductCategoryID = string;

type ProductCategory = {
  id: ProductCategoryID;
  name: string;
};
```

#### Product
```typescript
type ProductID = string;

type ProductProductCategory = ProductCategoryID | ProductCategory;

type Product<
  TProductProductCategory extends ProductProductCategory = ProductProductCategory
> = {
  id: ProductID;
  name: string;
  price: number;
  category: TProductProductCategory | null;
  imageURI: string;
  rating: number | null;
  description: string;
};
```

#### Order
```typescript
type OrderID = string;

type OrderProduct = ProductID | Product;

type OrderUser = UserID | User;

type Order<
  TOrderProduct extends OrderProduct = OrderProduct,
  TOrderUser extends OrderUser = OrderUser
> = {
  id: OrderID;
  createdAt: string;
  products: Array<TOrderProduct>;
  totalPrice: number;
  user: TOrderUser;
};
```

#### ProductReview
```typescript
type ProductReviewID = string;

type ProductReviewProduct = ProductID | Product;

type ProductReviewUser = UserID | User;

type ProductReview<
  TProductReviewProduct extends ProductReviewProduct = ProductReviewProduct,
  TProductReviewUser extends ProductReviewUser = ProductReviewUser
> = {
  id: ProductReviewID;
  rating: number;
  createdAt: string;
  body: string;
  product: TProductReviewProduct;
  user: TProductReviewUser;
};
```

### What the heck are those generics?
Usually an API caters to its clients by "joining"/"nesting" related entities in order to reduce requests to the API. Some endpoints *need* to provide normalized "shallow" entities for performance reasons, and some can provide deeply nested entity trees—it varies. With generics, we can accurately model an entity tree of any depth.

Lets use the `Product` entity as an example. The `<ProductDetail />` React component needs to render the category name, so it requires a `Product` *and* its `ProductCategory`, modeled as `Product<ProductCategory>`. If `<ProductDetail />` received a `Product<ProductCategoryID>` it would only have the category's ID and be unable to render its name. The Redux action `ReceiveProduct` is non-specific; any depth of a `Product` tree can be dispatched with `ReceiveProduct`. This flexibility is modelled as `Product<ProductCategoryID | ProductCategory>`, simplified as `Product<ProductProductCategory>`, or just `Product` if we rely on the default type argument. The API function `updateProduct()` takes a `Product` of any depth, but returns a shallow `Product<ProductCategoryID>` as that's the behavior of the API.

The Redux store is normalized, so all entities are stored in their shallow forms. Selectors are used to denormalize the entities, essentialy stitching related entities together from different branches of the store. Normalizing an entity is a cheap and pure operation, as you can always produce the "bottom type" of the edge, the ID, with the full entity.

*I'll admit the generics syntax could get pretty unwieldy when there's many relationships, or for some reason we need to model a deep tree (unlikely).*


### redux-observable
I've used `redux-saga` religiously for three years now. That all said, I'm a huge fan of point-free, functional style programming. I love to use `lodash/fp` to build functional "pipelines".


react-redux, containers, reuseable components
containers only in app





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





