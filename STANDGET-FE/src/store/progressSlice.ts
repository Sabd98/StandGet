import { createSlice } from "@reduxjs/toolkit";

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    cartVisible: false,
    checkoutVisible: false,
  },
  reducers: {
    showCart: (state) => {
      state.cartVisible = true;
      state.checkoutVisible = false;
    },
    hideCart: (state) => {
      state.cartVisible = false;
    },
    showCheckout: (state) => {
      state.checkoutVisible = true;
      state.cartVisible = false;
    },
    hideCheckout: (state) => {
      state.checkoutVisible = false;
    },
  },
});

export const { showCart, hideCart, showCheckout, hideCheckout } =
  progressSlice.actions;
export default progressSlice.reducer;
