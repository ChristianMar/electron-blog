import {
  createEntityAdapter,
  EntityAdapter,
  EntityState
} from '@reduxjs/toolkit';

import { IUserItem, IUsers, IUsersGet } from '../../mocks/users';
import { usersApi } from '../api/usersApi';

export const usersAdapter: EntityAdapter<IUserItem> =
  createEntityAdapter<IUserItem>({
    selectId: (user) => user.id,
    sortComparer: (a, b) => a.username.localeCompare(b.username)
  });

const initialState = {
  cursor: {},
  users: usersAdapter.getInitialState({})
};

export const extendedUsersSlice = usersApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (data: IUsersGet) => ({
        url: '/users/all_users',
        method: 'POST',
        body: data
      }),
      transformResponse: (responseData: IUsers<IUserItem>) => {
        return {
          cursor: responseData.cursor,
          users: usersAdapter.addMany(initialState.users, responseData.users)
        };
      }
    })
  })
});

export const usersSelectors = usersAdapter.getSelectors<EntityState<IUserItem>>(
  (state) => state
);

export const { useGetUsersQuery, endpoints } = extendedUsersSlice;
