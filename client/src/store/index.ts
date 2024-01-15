import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication";
import cartReducer from "./cart";
import filterReducer from "./filter";
import pathReducer from "./path";
import orderReducer from "./order";
import productsReducer from "./products";
import uiReducer from "./ui";

const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    cart: cartReducer,
    filter: filterReducer,
    path: pathReducer,
    order: orderReducer,
    products: productsReducer,
    ui: uiReducer,
  },
});

export default store;
