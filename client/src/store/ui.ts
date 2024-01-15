import { createSlice } from "@reduxjs/toolkit";
import { View } from "../ts/types";

const initialUiState = {
  showSidebar: false,
  isSearching: false,
  productsListView: View.Grid,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    closeSideBar: (state) => {
      state.showSidebar = false;
    },
    toggleSideBar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    changeProductListView: (state, action) => {
      state.productsListView = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
