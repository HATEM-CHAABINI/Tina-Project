import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import combinedReducer from './reducers'
import rootSaga from './reducers/saga'

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

export const addListener = createReduxBoundAddListener("root");

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  combinedReducer,
  applyMiddleware(
    navMiddleware,
    sagaMiddleware
  )
)

sagaMiddleware.run(rootSaga)

export default store;
