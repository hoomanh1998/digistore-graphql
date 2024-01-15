import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
  products: [] as any[],
  hasMoreProducts: true,
  pageNumber: 1,
  currentPageNumber: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    setProducts: (state, action) => {
      state.products = state.products.concat(action.payload);
      state.currentPageNumber = state.currentPageNumber + 1;
    },
    setHasMoreProducts: (state, action) => {
      state.hasMoreProducts = action.payload;
    },
    setPageNumber: (state) => {
      state.pageNumber = state.pageNumber + 1;
    },
    setCurrentNumber: (state) => {
      state.currentPageNumber = state.currentPageNumber + 1;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
