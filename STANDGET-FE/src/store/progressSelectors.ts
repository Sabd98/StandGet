interface Progress {
  progress: { cartVisible: boolean; checkoutVisible:boolean };
};
export const selectCartVisible = (state: Progress) => state.progress.cartVisible;
export const selectCheckoutVisible = (state:  Progress ) =>
  state.progress.checkoutVisible;
