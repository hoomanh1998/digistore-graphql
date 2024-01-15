import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../ts/types";

const initialOrderState: Order = {
  id: "",
  orderItems: [],
  deliveryLocation: {
    city: "",
    address: "",
  },
  orderDate: "",
  totalItems: 0,
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    setOrder: (state, action) => {
      //rewrite this code
      state.id = action.payload.id;
      state.orderItems = action.payload.orderItems;
      state.deliveryLocation = action.payload.deliveryLocation;
      state.orderDate = action.payload.orderDate;
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
