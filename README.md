TODO:
- content:
```
intro<<<<<>>>>>
folder structure
by-domain

redux app, react as view layer
view can be swapped out

reducers should only prpduce new references when absolutely necessary. i didn't worry about this and opted for declarative fp code
memoized selectors - can I do better?

indexedb, first time using
wanted to simulate the apis/databases
prosmisified all indexeddb operations
"api" file makes requests to indexdb instead of network requests
arbitrary slowness added for realism
populated with randomly generated data on initial "api request"
deleted entities,eg when a User is deleted, its ProductReviews and Orders are deleted, for simplicity

functional lodash


```
- Organize further
- Editing
- References

### Redux First
I prefer to build Redux apps, with React acting as the view layer. I think of a web app in terms of entities, relationships, state transitions, and side effects. The view is a visual representation of the app's state, as well as an actor (the user), able to emit events. The app can respond to these events by enacting a state transition, or by affecting the outside world by yielding side-effects.

Redux is a tiny library, but it establishes a straight-forward and highly scalable architectural pattern.

### Aside on Boilerplate
I'm not bothered by the verbose code a Redux app tends to have. TypeScript makes it even *more* verbose, and I'm still fine with it. In this example project, I refrained from using or creating abstractions for the sake of DRYness, in order to keep the patterns unmistakable. I copy-pasted **a lot**, and I think that's a good sign.

### Aside On My Opinions
My opinions do not reflect those of Facebook in any way.

I should state that I am not preaching this architecture as gospel. Blah blah blah

### The Example Project
Meet Recommerce, a semi-functional ecommerce store. The user can browse and manage products, categories, reviews, orders, and users. My goal is not to demonstrate how to build a great shopping experience. Instead I chose an ecosystem of entities that are universally understood. The user cannot purchase products--there is no cart. The user is a sort of admin or "superuser" with the ability to create, edit, and delete entities. It's a bit ugly; I wrote only functional styles (inline), and avoided any sort of styling library. Styling is not the focus. FWIW, I prefer css-in-js ;)

I believe the archecture laid out here allows an app like Recommerce to scale immensely by mere repetition.

### The APIs
There is an `api.ts` file for each entity module, where functions interface with the entity's API. As this is an example project, there are no APIs. These functions issue local requests to the IndexedDB database in the browser instead of HTTP requests to a remote API. Observe the interfaces of these functions, but understand their bodies are simulated for demonstration purposes.

### Folder Structure
I prefer to organize by domain rather than by type. Within a domain I then organize by type: constants, types, utils, components, etc. WHY

Recommerce is broken into an `/app` module, 5 entity modules, a `routes` module, and a `utils` module.
```
index.tsx
/app
  /components
  constants.ts
  effects.ts
  selectors.ts
  store.ts
  types.ts
/[orders|product-categories|product-reviews|products|users]
  /components
  actions.ts
  api.ts
  constants.ts
  effects.ts
  reducers.ts
  selectors.ts
  types.ts
  utils.ts
/routes
  actions.ts
  constants.ts
  reducers.ts
  selectors.ts
  types.ts
/utils
```

#### The `/app` Module
The `/app` module--wait for it--*is* the application. It bootstraps the application, and forks the thread-like middleware provided by the modules. It is the "god module" and the intersection point for all the decoupled modules. It composes the other modules and orchestrates between them. It also delegates to the other modules. `/app` depends on the other modules, but they do not depend on it (the other modules do not import from `/app`). I've found this to be a good strategy in avoiding circular dependency issues. It also encourages reuseable, app-agnostic modules that can evolve into standalone packages.

`/app` defines the root-level `State` type of the Redux store. It does so by composing the `State` types of the other modules into a tree. Only `/app` knows the shape of the top-level state tree. It does not need to know the shape of its branches.

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

In a similar manner, `/app` defines the root reducer by composing the reducers of the other modules.

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

#### The `/routes` Module
The `/routes` module serves a logical grouping of everything pertaining *only* to Recommerce's routing. It does not depend on `/app`, but `/app` depends on it; this way we're safe from circular reference issues. It is however, specific to Recommerce.

#### The `/utils` Module
The `/utils` module serves as a bucket for general purpose, reusable code. It has no dependencies on the other modules, but they may depend on it. This is another way we'll save ourselves from circular reference issues.

#### The Entity Modules
These may as well be seperate packages from the app.
The entity modules are completely decoupled from the app, therefore they do not know the shape of the top-level state tree, or the shape of any other module's state. These boundaries shield the modules from changes to the others. But maybe more importantly, it allows us to reason about a module locally. Entity module selectors and reducers can only operate on their respective slice of state. Entity module side-effects (Redux middleware) only respond to their own Redux actions. An entity module is independent and portable, and a person or team can scale relentlessly (in in parallel) within their module as long as they don't breach the boundaries. The only cross-dependencies with entity modules is at the type level--there are no runtime dependencies.

Database schemas and APIs are likely to be reused by applications, so I like to build redux modules/packages around those schemas and APIs. In a large codebase with multiple apps, I like to create a `products` package. This `products` package will define the product types, API client, and utils. It contains only the lowest common denominator of technologies used in all the apps. Most likely this means React components are included in the `products` package. If Redux isn't ubiquitous across all the apps, then I'll create a `redux-products` package that depends on `products`, and provides all of the Redux bindings: reducers, selectors, actions, and middleware.

##### Composing Selectors
Entity module selectors operate *only* on their respective state slice. They cannot select from other slices. This decoupling keeps them reuseable in other apps.

Selectors are only composable if the outer selector's input state branch is the same or an ancestor of the inner selector's input state branch. In practicality this means the app needs to promote the local entity selectors into root selectors so they all share the same root: the root of the application state tree.

We can create root selectors from local selectors using the utility `selectFromRoot`.
```typescript
// simplified from /utils/fn.ts
function selectFromRoot(sliceSelector, localSelector) {
  return (state, ...args) => localSelector(sliceSelector(state), ...args);
}
```

We can then take a local selector such as `/products`' `getProductByID`...
```typescript
// /products/selectors.ts
const getProductByID = (
  state: State, // /products State
  productID: ProductID | undefined | null
) => (productID && byID(state)[productID]) || null;
```

...and promote it to a root selector.
```typescript
// /app/selectors.ts
const products = (state: State) => state.products;

const getProductByID = selectFromRoot(
  products,
  ProductsSelectors.getProductByID
);
```

Now we can compose these root selectors and are free to reconfigure the root state shape at any point. Bonus: container components are decoupled from the root state shape if they're only using root selectors.



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

The Redux store is normalized, so all entities are stored in their shallow forms. We can use selectors to denormalize the entities, essentialy stitching related entities together from different branches of the store. Normalizing, on the other hand, is a cheap and pure operation, as we can just map a downstream entities to their IDs.

*I'll admit the generics syntax could get pretty unwieldy when there's many relationships, or for some reason we need to model a deep tree (unlikely).*

### Redux Middleware For Effects
There are tons of great articles about redux middleware, so I'll assume some level of familiarity. I particularly prefer middleware that offer a thread-like behavior for running effects. I'm mainly referring to `redux-saga` and `redux-observable`.

### Recommerce Effects
Recommerce performs it's side effects within `redux-observable` epics (see `*/effects.ts`). It implements a form of the saga pattern. Each module defines self-contained "local" sagas (epics), where the only IO is the module's respective actions and API calls. The `/app` module defines higher-level sagas that act as orchestrators, pushing and pulling data to/from the local sagas through the universal message bus: the Redux store. A module's actions become the interface for its sagas. These orchestrator sagas can generate a transaction ID and provide that as action meta to the local sagas. The local sagas will pipe this transaction ID through all of the resulting actions so the orchestrator can safely identity related actions within a transaction flow. This makes it possible for the `/products` module to completely own the product creation transaction, as well as enable the orchestrator to dispatch `CREATE_PRODUCT` and identity the resulting `RECEIVE_PRODUCT`.

Sometimes an entity type is received from another entity's API. For instance, the `getProduct()` API function returns a `Product` with its `ProductCategory`. We don't want that `ProductCategory` to go to waste when we normalize the product for storing, but we also don't want to couple the `/products` reducer to any of the `/product-categories`' actions. We can write an `/app` saga that integrates these two modules and stores any `ProductCategory` (`/product-categories`) that is received within a `RECEIVE_PRODUCT` action (`/products`).

### redux-observable
I'm a huge fan of point-free, functional style programming. I love to use `lodash/fp` to compose functions point-free. Even though I've used `redux-saga` religiously for the last three years, I wanted to try out `redux-observable` because of the point-free functional style of `rxjs`. I can't map (pun) most of my saga recipes into `rxjs` yet, but I enjoy this style much more. Experts, please let me know if I can improve any of the epics!

### Container Components
I tend to decouple presentational components (I'll refer to them as components) from their redux-connected versions (containers). This seperation encourages building a more flexible and futureproof&trade; component API. Component's don't need to understand redux actions, dispatches, or generally their context within an app. Instead they offer delegation callbacks like `renderProduct`, and semantic, flexible event callbacks like `onOrderDelete`. All the `<OrderDetail />` component wishes to express is the User's intent to delete an order. A container composed around this component can dispatch `DELETE_ORDER` when the underlying component calls its `onOrderDelete`. The container is coupled to the application's state tree, selectors, actions, and maybe more. The component, on the other hand, is only coupled to the `Order` interface, and can be reused in other apps.

In recommerce, modules are completely decoupled. For instance, `<OrderDetail />` delegates the rendering of products (`renderProduct`) to its parent/caller. The various modules define components dedicated to rendering their respespective entity (and no others), and the `/app` module builds containers around those components. Since these modules do not depend on the `/app` module (only the reverse is true), then only `/app` builds containers. Containers are coupled to the redux store, and only `/app` is aware of the store.

#### Typing a Container Component
Typing a container with TypeScript isn't exactly easy, and I won't offer an easy solution. Here's how we can achieve full type-safety and piece of mind when defining containers:

```typescript
// Here we can derive the props from the presentational component <OrderDetail />
type OrderDetailProps = ComponentProps<typeof OrderDetail>;

// This set of props is commonly referred to as StateProps.
// Here we define the subset of OrderDetail's props that we will be
// providing from the store via mapStateToProps.
type OrderDetailContainerStateProps = Pick<OrderDetailProps, 'order'>;

// This set of props is commonly referred to as DispatchProps.
// Here we define the subset of OrderDetail's event callback props
// that we want to dispatch actions from. Event callback props
// are generally optional, so let's force them to be Required
// to better guide us while implementing mapDispatchToProps.
type OrderDetailContainerDispatchProps = Required<
  Pick<OrderDetailProps, 'onOrderDelete'>
>;

// This set of props is commonly referred to as OwnProps.
// Here we define the remaining set of props from OrderDetail that
// are to be passed in to the container by its parent. We can use
// Omit to "subtract" the StateProps and DispatchProps from the
// OrderDetail props. This way, if we decide an additional
// OrderDetail prop is to be provided from the store as a StateProp,
// it will automatically be removed from the OwnProps of the container.
type OrderDetailContainerOwnProps = Omit<
  OrderDetailProps,
  | keyof OrderDetailContainerStateProps
  // In this case, we are requiring onOrderDelete to be provided
  // by mapDispatchToProps as a DispatchProp, but we also want the
  // parent of the container to have the option to implement it.
  // In a simpler case:
  // OwnProps = Props - (StateProps + DispatchProps).
  // But in this case:
  // OwnProps = Props - (StateProps + (DispatchProps - onOrderDelete))
  | keyof Omit<OrderDetailContainerDispatchProps, 'onOrderDelete'>
>
// Here we add new props that are to be passed into the container
// from the parent. Often these props are used as arguments to selectors
// in mapStateToProps. In this case, OrderDetailContainer is to be
// given an OrderID from the parent. It then reads the Order from
// the store, so it can provide it to the underlying presentational
// component, OrderDetail.
& {
  orderID: OrderID | undefined | null;
};

// All of that deconstructing of OrderDetail's props is so we can
// provide type arguments to react-redux's connect HOC. This way
// mapStateToProps and mapDispatchToProps are fully type-safe.
export const OrderDetailContainer = connect<
  OrderDetailContainerStateProps,
  OrderDetailContainerDispatchProps,
  OrderDetailContainerOwnProps,
  State
>(
  (state, { orderID }) => ({
    order: getOrderByIDDenormalized(state, orderID),
  }),
  (dispatch, { onOrderDelete }) => ({
    onOrderDelete: order => {
      dispatch(deleteOrder({ orderID: order.id }));
      onOrderDelete?.(order);
    },
  })
)(OrderDetail);
```

### State
I agree with the offical Redux recommendation to treat the Redux store like a database. The store contains "tables" of normalized entities (1), precomputed "views" (2), and "indexes" for improved read performance (3). Let's break each of those down, in the context of the `ProductReview` state:

```typescript
type State = {
  byID: Partial<Record<ProductReviewID, ProductReview<ProductID, UserID>>>; // 1) "table"
  allIDs: Array<ProductReviewID>; // 2) "view"
  idsByUserID: Partial<Record<UserID, Array<ProductReviewID>>>; // 3) "index"
  idsByProductID: Partial<Record<ProductID, Array<ProductReviewID>>>; // 3) "index"
};
```

> **Aside on `Partial<>`**
>
> I use `Partial<>` to force myself to null-check dictionary reads.

#### `byID`
This is a dictionary where normalized `ProductReview`s are stored by their ID. We can think of it as a representation of the product reviews table on the backend. It of course only holds the product reviews we've received from the product reviews API. A `ProductReview` is *only* found in this dictionary. This prevents maintenance hazards where multiple references to the same product review exist simultaneously in the store. Depending on our needs, we can choose to append to the dictionary and accumulate product reviews, or replace it each time we receive API results. I generally opt to "accumulate", as it can improve UX if a product review is already cached. *Note: at a certain point, a huge dictionary will slow down writes, and some computational reads (eg Object.values(byID)).*

 Retreiving a specific product review by ID is easy and constantly fast, as it's just a key lookup on the dictionary. If we want to retreive a list of product reviews, we have a few options:
 1. Derive the list from the dictionary in a selector. Usually this means some form of `Object.values()`. We may need to sort.
 2. Same as 1) but memoize on the `byID` dictionary reference. Any update, insert, or delete to `byID` will require the selector to recompute.
 3. Compute a "view" on write, for more efficient reads.

Generally 2) or 3) are preferred.

#### `allIDs`
This list of product reviews IDs is similar to a database "view". We can precompute this list, potentially sorted, whenever we write to the store. This can help improve read performance, as little or no computation is needed. The cost is incurred during write, but in general, writes to the store are less frequent than reads.

#### `idsByUserID`
This dictionary is similar to a database "index". We can create these indexes so we can read related entities in constant or linear time (with a reduced set). By maintaining this index on write, we can efficiently read a user's product reviews without any sort of searching. Here's an example of an efficent read using this index:
```typescript
const getProductReviewsByUserID = (
  state: State,
  userID: UserID
): Array<ProductReview> =>
  state.productReviews.idsByUserID[userID].map(productReviewID =>
    state.productReviews.byID[productReviewID]
  );
```

### Reducer Logic
In general, it's best practice to preserve existing references in the state tree whenever their objects are unaffected by the state transition. This enables selectors and components to memoize by these references. However, like any best practice, there are tradeoffs.

Lets look at `/products`' reducer.
```typescript
// /products/reducers.ts
case ActionType.CREATE_PRODUCT:
case ActionType.UPDATE_PRODUCT:
case ActionType.RECEIVE_PRODUCT: {
  const {
    payload: { product },
  } = action;
  const productNormalized = normalizeProduct(product);

  if (
    action.type === ActionType.UPDATE_PRODUCT &&
    state.byID[productNormalized.id] == null
  ) {
    return state;
  }

  const byID: typeof state['byID'] = {
    ...state.byID,
    [productNormalized.id]: productNormalized,
  };

  // an UPDATE doesn't affect the idea
  const allIDs: typeof state['allIDs'] = pipe(
    values,
    map<Product<ProductCategoryID>, ProductID>(product => product.id)
  )(byID);

  const idsByProductCategoryID: typeof state['idsByProductCategoryID'] = pipe(
    values,
    groupBy<Product<ProductCategoryID>>(product => product.category),
    mapValues(map(product => product.id))
  )(byID);

  return {
    ...state,
    byID,
    allIDs,
    idsByProductCategoryID,
  };
}
...
```

### Request State
Notice the lack of loading indicators in Recommerce, and confusing text that reads "No orders" when tbe user first load the `/orders` route. That is my laziness.

Here's how we can implement tracking of request state so we can render loading indication. Let's just focus on `Order` requests.

Let's define a type to model the state of a request:
```typescript
type Request = {
  state: 'ACTIVE' | 'LAGGING';
  error?: never;
} | {
  state: 'FAILED';
  error: string;
};
```
We'll use `ACTIVE` to indicate the request is in-flight. We'll use `LAGGING` when we determine the request to be taking longer than it should. We may decide to only show loading indication when a request is `LAGGING`, as we want to reduce the chance of the loading indication being displayed for just a split second before the real, loaded content is displayed. `FAILED` is used to indicate an error during the request, and an `error` string **must** be provided.

Now we need to model an event so we can relay a request's change of state to the rest of the system. For now, let's just focus on a request for a single order, like that in the `/orders/:orderID` route. Let's create an action:
```typescript
type OrderRequestStateChanged = {
  type: ActionType.ORDER_REQUEST_STATE_CHANGED;
  payload: {
    orderID: OrderID;
    request: Request;
  };
};
```

Here's our orders state:
```typescript
type State = {
  byID: Partial<Record<OrderID, Order<ProductID, UserID>>>;
  allIDs: Array<OrderID>;
  idsByUserID: Partial<Record<UserID, Array<OrderID>>>;
};
```

Let's create some state to hold our order requests:
```typescript
type State = {
  // ...
  requestsByOrderID: Partial<Record<OrderID, Request>>;
};
```

Now we can write to this new state in the orders reducer:
```typescript
// ...
case ActionType.ORDER_REQUEST_STATE_CHANGED: {
  const { payload: { orderID, request } } = action;

  return {
    ...state,
    requestsByOrderID: {
      ...state.requestsByOrderID,
      [orderID]: request
    }
  };
}
// ...
// We can remove the request when handling RECEIVE_ORDER
```

We then need to dispatch `ORDER_REQUEST_STATE_CHANGED` in our middleware (epics/sagas/middlewares) where we're making the requests.

We can then write a selector to retreive a request:
```typescript
function getOrderRequestByID(state: State, orderID: OrderID): Request | null {
  return state.requestsByOrderID[orderID] || null;
}
```

And in `<OrderDetail />`:
```typescript
// ...
if (order == null && request?.state === 'LAGGING') {
  return <div>Loading order...</div>;
} else if (request?.state === 'FAILED') {
  return <div>{request.error}</div>;
}
// ..
```

### Routing
I've used `react-router` ever since I started using React. It's a great library for a react-first architecture, where the component tree is the whole app: state, side-effects, and UI all within components. However `redux-first-router` is much more inline with my idea of redux-first architecture.

Here's a quick summary of how it works.

#### Define a Route Map
```typescript
// /routes/constants.ts
const routeMap: Record<ActionType, string> = {
  [ActionType.PRODUCT]: '/products/:productID',
  [ActionType.PRODUCT_EDIT]: '/products/edit/:productID',
  [ActionType.PRODUCT_CREATE]: '/create',
  [ActionType.PRODUCT_CATEGORY_EDIT]: '/categories/edit/:productCategoryID',
  [ActionType.PRODUCT_CATEGORY_CREATE]: '/categories/create',
  [ActionType.PRODUCTS]: '/',
  [ActionType.ORDER]: '/orders/:orderID',
  [ActionType.ORDERS]: '/orders/',
  [ActionType.USER]: '/users/:userID',
  [ActionType.USERS]: '/users/',
};
```
Notice the keys of the map are the `/routes` module's `ActionType`. This alludes to the fact that we model route transitions *as* Redux actions.

**The `redux-first-router` library maps our action types to the URL, bidrectionally.**

1) The library will dispatch our *own* action types when the route transitions. This means we can build a reducer to store information about the current route.
```typescript
// /routes/reducers.ts
...
switch (action.type) {
  case ActionType.PRODUCTS:
    return {
      currentRoute: action.type,
      productCategoryID: action.meta.query?.productCategoryID,
    };
...
```
Our middleware listens for `ActionType.PRODUCTS` in the action stream, and runs effects for that route.
```typescript
// simplified from /app/effects.ts
const productsRouteEpic: Epic = action$ =>
  action$.pipe(
    ofType(RoutesActionType.PRODUCTS),
    mergeMap(({ meta }: ReceivedActionMeta) =>
      of(
        requestProducts({
          productCategoryID: meta?.query?.productCategoryID,
        }),
        requestProductCategories()
      )
    )
  );
```

Our UI reads the route data from the store and determines which component to render.
```typescript
// /app/components/App.tsx
function CurrentScreen() {
  const Screen = useSelector(getCurrentScreenComponent);

  return <Screen />;
}
```
*This is a rare time I'll use `useSelector`.*

2) We dispatch our *own* action types to transition routes.
```typescript
// expresses the intent to transition to the /users route
// the library changes the URL for us
store.dispatch({ type: RoutesActionType.USERS }); 
```
And use the `<Link />` or `<NavLink />` component from `redux-first-router-link`.
```typescript
// simplified from /app/components/ProductCategoryList.tsx
<NavLink
  to={{
    type: RoutesActionType.PRODUCTS,
    meta: {
      query: { productCategoryID: category.id },
    },
  }}
>
  {category.name}
</NavLink>
```