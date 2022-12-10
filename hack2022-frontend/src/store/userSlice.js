// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const initialState = { login: "" };
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { login } = action.payload;
      state.login = login;
    },
    logout(state, action) {
      return {};
    },
  },
});

export default user.reducer;
export const { setUser, logout } = user.actions;
export const selectUser = (state) => state.user;
