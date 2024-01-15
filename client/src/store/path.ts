import { createSlice } from "@reduxjs/toolkit";

const initialPathState = {
  login: {
    prevPath: "",
    nextPath: "",
  },
  product: {
    prevPath: "",
  },
};

const pathSlice = createSlice({
  name: "path",
  initialState: initialPathState,
  reducers: {
    setLoginPrevPath: (state, action) => {
      state.login.prevPath = action.payload;
    },
    setLoginFullPath: (state, action) => {
      state.login.prevPath = action.payload.prev;
      state.login.nextPath = action.payload.next;
    },
    setProductPrevPath: (state, action) => {
      state.product.prevPath = action.payload;
    },
    resetLoginPrevPath: (state) => {
      state.login.nextPath = "";
      state.login.prevPath = "";
    },
  },
});

export const pathActions = pathSlice.actions;

export default pathSlice.reducer;
