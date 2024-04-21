import { configureStore } from "@reduxjs/toolkit";
import token from "../redux/tokenSlice";
import users from "../redux/usersSlice";

export const store = configureStore({
  reducer: {
    token: token,
    user: users,
  },
});
