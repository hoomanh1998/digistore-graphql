import { createSlice } from "@reduxjs/toolkit";
import { LocalCartItem } from "../ts/types";

const initialCartState: LocalCartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem: LocalCartItem = action.payload;
      const existingItem = state.find(
        (item) => item.productId === newItem.productId
      );
      if (!existingItem) {
        state.push({
          productId: newItem.productId,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },
    resetCart: () => initialCartState,
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
