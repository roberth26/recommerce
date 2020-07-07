What is recommerce
Recommerce is an ecommerce store. Sort of. I wanted to pick a project that was well understood. The app displays products, categories. More of an "administrator" app than consumer. Doesn't offer buy buttons, cart, etc. Allows crud operations on the various entities, no permissions. BLah blah

descript each entity:
Product:


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





