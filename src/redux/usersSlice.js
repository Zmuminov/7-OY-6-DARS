import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    register: (state, actions) => {
      let copied = JSON.parse(JSON.stringify(state));
      copied.push(actions.payload);
      return (state = copied);
    },
  },
});

export const { register } = usersSlice.actions;
export default usersSlice.reducer;
