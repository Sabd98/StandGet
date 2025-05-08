import { createSlice } from "@reduxjs/toolkit";
import { Cart, Items } from "../utils/interfaces";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state: Cart, action) {
      const existingItem = state.items?.find(
        (item: Items) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items?.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state: Cart, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem?.quantity === 1) {
        state.items = state.items?.filter((item) => item.id !== action.payload);
      } else {
        if (existingItem) {
          existingItem.quantity--;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
