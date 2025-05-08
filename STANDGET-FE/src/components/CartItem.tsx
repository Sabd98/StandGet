import { currencyFormatter } from "../utils/formatting";
import { CartItemProps } from "../utils/interfaces";


export default function CartItem({name,price,quantity,onDecrease,onIncrease }: CartItemProps) {
  return (
    //Increase and Decreasse
    <li className="cart-item flex justify-between items-center">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions flex gap-4 items-center">
        <button
          className="flex items-center justify-center"
          onClick={onDecrease}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="flex items-center justify-center"
          onClick={onIncrease}
        >
          +
        </button>
      </p>
    </li>
  );
}
