import { createSlice } from "@reduxjs/toolkit";

const initialAuthenticationState = {
  prevPath: "",
  nextPath: "",
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialAuthenticationState,
  reducers: {
    login: (state, action) => {
      //code
    },
    logout: (state, action) => {
      //code
    },
  },
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
