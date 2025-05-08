// Checkout.tsx
import { useState } from "react";
import Modal from "./UI/Modal";
import { useAuth } from "../store/authContext";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../store/cartSelectors";
import { clearCart } from "../store/cartSlice";
import { hideCheckout } from "../store/progressSlice";
import useHttp from "../hooks/useHttp";
import Button from "./UI/Button";
import { selectCheckoutVisible } from "../store/progressSelectors";
import { currencyFormatter } from "../utils/formatting";

export default function Checkout() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const checkoutVisible = useSelector(selectCheckoutVisible);

  const [invoiceUrl, setInvoiceUrl] = useState("");

  const { sendRequest } = useHttp();

  //Handler close modal or finishing handler
  const handleClose = () => {
    dispatch(hideCheckout());
  };

  const handleFinish = async () => {
    console.log(user);
    if (!user) return;

    try {
      //Order Input Response
      const orderResponse = await sendRequest({
        url: "http://localhost:3000/orders",
        method: "POST",
        data: {
          items: cartItems,
          total: cartTotal,
        },
      });

      if (orderResponse.id) {
        const pdfResponse = await fetch(
          `http://localhost:3000/invoice/${orderResponse.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        //Fetch Invoice to PDF
        const pdfBlob = await pdfResponse.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setInvoiceUrl(pdfUrl);
        const pdfWindow = window.open(pdfUrl, "_blank");
        if (pdfWindow) {
          pdfWindow.focus();
        } else {
          alert("Please allow pop-ups for this site");
        }

        dispatch(clearCart());
        dispatch(hideCheckout());

      }
    } catch (err) {
      console.error("Checkout failed:", err);
    }

  };

  return (
    <Modal open={checkoutVisible} onClose={handleFinish}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Order Confirmation</h2>
        <p>Your order has been placed successfully!</p>
        <p className="text-lg font-semibold text-[#46443c]">
          Total Amount: {currencyFormatter.format(cartTotal)}
        </p>
        <div className="flex gap-x-4">
          <Button onClick={handleFinish}>
            <a href={invoiceUrl}>Submit</a>
          </Button>
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

