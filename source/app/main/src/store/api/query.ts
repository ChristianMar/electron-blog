import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/dist/query';
import { Mutex } from 'async-mutex';

import { ILogged } from '../../mocks/auth';
import { logout, selectCurrentUser, setCredentials } from '../slices/userSlice';
import { RootState } from '../store';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.user.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});
const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    const status = result.error.status;
    const message = result.error.data as { message: string };
    if (status === 401 && message.message === 'TOKEN_EXPIRED') {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const user: ILogged = selectCurrentUser(api.getState() as RootState);
          const refreshResult = await baseQuery(
            {
              url: '/auth/refresh_token',
              method: 'POST',
              body: { username: user.username, password: user.password }
            },
            api,
            extraOptions
          );
          if (refreshResult.data) {
            api.dispatch(setCredentials(refreshResult.data as ILogged));
            result = await baseQuery(args, api, extraOptions);
          } else {
            console.log('else');
            api.dispatch(logout());
          }
        } catch (e) {
          console.log('catch', e);
          api.dispatch(logout());
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }
  return result;
};

export default baseQueryWithRefresh;
