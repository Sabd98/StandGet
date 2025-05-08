import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import progressReducer from "./progressSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    progress: progressReducer,
  },
});
