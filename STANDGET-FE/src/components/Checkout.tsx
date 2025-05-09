// Checkout.tsx
import Modal from "./UI/Modal";
import { useAuth } from "../hooks/authContext";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../store/cartSelectors";
import { clearCart } from "../store/cartSlice";
import { hideCheckout } from "../store/progressSlice";
import useHttp from "../hooks/useHttp";
import Button from "./UI/Button";
import { selectCheckoutVisible } from "../store/progressSelectors";
import { currencyFormatter } from "../utils/formatting";
import { URL_API } from "../utils/url";

type OrderResponse = {
  id:string;
}
export default function Checkout() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const checkoutVisible = useSelector(selectCheckoutVisible);

  const { sendRequest } = useHttp<OrderResponse>();

  const handleFinish = async () => {
    if (!user) return;

    try {
      //Order Input Response
      const orderResponse = await sendRequest({
        url: `${URL_API}/orders`,
        method: "POST",
        data: {
          items: cartItems,
          total: cartTotal,
        },
      });

      if (orderResponse.id) {
        const pdfResponse = await fetch(
          `${URL_API}/invoice/${orderResponse.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        //Fetch Invoice to PDF
        const pdfBlob = await pdfResponse.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
       const link = document.createElement("a");
       link.href = pdfUrl;
       link.download = `invoice-${orderResponse.id}.pdf`;
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);

        dispatch(clearCart());
        dispatch(hideCheckout());
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  const handleClose = () => {
    dispatch(hideCheckout());
  };

  return (
    <Modal open={checkoutVisible} onClose={handleClose}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Order Confirmation</h2>
        <p>Your order has been placed successfully!</p>
        <p className="text-lg font-semibold text-[#46443c]">
          Total Amount: {currencyFormatter.format(cartTotal)}
        </p>
        <div className="flex gap-x-4">
          <Button onClick={handleFinish}>
           Submit
          </Button>
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

