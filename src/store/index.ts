import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';

import { AnyAction, Store, configureStore } from '@reduxjs/toolkit';
import rootReducers from './rootReducer';
import rootSaga from './rootSaga';

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        thunk: false,
        // serializableCheck: false
      }),
      sagaMiddleware,
    ],
    devTools: process.env.NODE_ENV !== 'production',
  });

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);

export interface SagaStore extends Store<RootState, AnyAction> {
  sagaTask: Task;
}
