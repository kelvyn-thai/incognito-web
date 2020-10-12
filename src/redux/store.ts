import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import { ENVS } from '@src/utils';

export interface IConfigStore {
  store: any;
  persistor: any;
}

const saga = createSagaMiddleware();

export const configStore = (preloadedState: any = {}) => {
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
    blacklist: [],
  };
  const middlewares = [thunk, saga];
  const persistedReducer = persistReducer(persistConfig, reducers);
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);
  const store: any = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers
  );
  let persistor = persistStore(store);
  if (ENVS?.__DEV__ && module.hot) {
    module.hot.accept('@src/redux/reducers', () => {
      const nextRootReducer = require('@src/redux/reducers').default;
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }
  return { store, persistor };
};
