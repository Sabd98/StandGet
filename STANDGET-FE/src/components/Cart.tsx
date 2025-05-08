
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { currencyFormatter } from "../utils/formatting";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../store/cartSelectors";
import { hideCart, showCheckout } from "../store/progressSlice";
import { addItem, removeItem } from "../store/cartSlice";
import { selectCartVisible } from "../store/progressSelectors";

export default function Cart() {
//Cart Methods
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartVisible = useSelector(selectCartVisible);

  //Modal Handler
  const handleClose = () => {
    if (cartVisible) {
      dispatch(hideCart());
    }
  };

  const handleToCheckout = () => {
    dispatch(showCheckout());
    dispatch(hideCart());
  };
  return (
    <Modal open={cartVisible} onClose={handleClose}>
      <h2 className="text-2xl font-bold text-[#1f1a09] mb-4">Caruto</h2>
      <ul>
        {items.length === 0 && (
          <p className="text-center py-4">Your cart is empty</p>
        )}
        {items.map((item) => (
          <CartItem
            key={item.id}
            onIncrease={() => dispatch(addItem(item))}
            onDecrease={() => dispatch(removeItem(item.id))}
            {...item}
          />
        ))}
      </ul>
      <p className="cart-total text-lg font-bold my-2">
        {currencyFormatter.format(cartTotal)}
      </p>
      <p className="flex justify-end gap-4 pt-4">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleToCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
