What is recommerce
Recommerce is an ecommerce store. Sort of. I wanted to pick a project that was well understood. The app displays products, categories. BLah blah

didn't create many abstractions for DRY, wanted to keep patterns obvious

Entity-first
normalized/denormalized types

folder structure
by-domain
no dependencies on app, prevents circular dependency
domain-scoped selectors, selectFromRoot()
containers have to be in app, by definition

connect - keeping components reusable
typescript props, stateprops, dispatchprops etc

redux state
"database", with indexes/jointables (correct analogies?)
normalized, deduplication
computation like sorting on write, as reading is far more frequent
reducers should

indexedb, first time using
wanted to simulate the apis/databases
"api" file makes requests to indexdb instead of network requests
arbitrary slowness added for realism

redux-observable for side-effects
wanted to learn it/try it for first time
love the functional style
used sagas for 3 years
saga pattern (orchestration), app/effects is the orchestrator, domain effects are de-coupled

functional lodash

redux-first-router

styling - minimalism, only functional styles
created styled primitives using inline styles





