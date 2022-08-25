import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILogged } from '../../mocks/auth';
import { RootState } from '../store';

const initialState = {
  user: {}
};

export const userSlice = createSlice({
  name: 'auth',
  initialState: initialState as {
    user: ILogged | Record<string, never>;
  },
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<ILogged>) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    }
  }
});

export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) =>
  state.user.user as ILogged;
