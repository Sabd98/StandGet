import { createSelector } from "@reduxjs/toolkit";
import { Cart, Items } from "../utils/interfaces";

export const selectCartItems = (state: { cart: Cart; }) => state.cart.items;

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce(
    (total: number, item: Items) => total + item.quantity * item.price,
    0
  )
);

export const selectTotalCartItems = createSelector([selectCartItems], (items) =>
  items.reduce((total: number, item: Items) => total + item.quantity, 0)
);
