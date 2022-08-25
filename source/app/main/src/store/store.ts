import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer
} from '@reduxjs/toolkit';

import { authApi } from './api/authApi';
import { postsApi } from './api/postsApi';
import { usersApi } from './api/usersApi';
import { loadState } from '../utils/reduxSyncStorage';
import userSlice from './slices/userSlice';
import { extendedUsersSlice } from './slices/usersSlice';
import { extendedPostsSlice } from './slices/postsSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const combinedReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [extendedUsersSlice.reducerPath]: usersApi.reducer,
  [extendedPostsSlice.reducerPath]: postsApi.reducer,
  user: userSlice
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/logout') {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.STAGE === 'dev',
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(postsApi.middleware)
      .concat(usersApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
