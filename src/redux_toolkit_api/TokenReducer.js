
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null ,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  isAuthenticated: false,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});


export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
