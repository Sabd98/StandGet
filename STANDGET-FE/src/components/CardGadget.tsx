import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import { GadgetProps } from "../utils/interfaces";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { Edit, ShoppingCart, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../hooks/authContext";
import useHttp from "../hooks/useHttp";

export default function CardGadget({
  gadget,
  isAdmin,
  onDeleteSuccess,
}: GadgetProps & { isAdmin: boolean; onDeleteSuccess: () => void }) {
  const dispatch = useDispatch();
  const formattedPrice = currencyFormatter.format(gadget.price);
  const { user } = useAuth();
  const { sendRequest } = useHttp();

  //Choose Gadget to Cart
  const handleAddGadgetToCart = () => {
    if (!user) {
      return;
    }
    if (user.role === "admin") {
      return;
    }
    dispatch(addItem(gadget));
  };

  //Delete Handler
  const removeGadget = async (gadgetId: string) => {
    await sendRequest({
      url: `http://localhost:3000/products/${gadgetId}`,
      method: "DELETE",
    });
    onDeleteSuccess();
  };
  return (
    //Inside Card
    <article className="gadget-item overflow-hidden text-center">
      <img src={`http://localhost:3000/${gadget.image}`} alt={gadget.name} />
      <div className="flex justify-between items-center mx-4 my-4">
        <h3 className="text-start">{gadget.name}</h3>

        <label className="gadget-item-price  items-center  text-sm font-bold px-2 py-1 rounded">
          {formattedPrice}
        </label>
      </div>
      <p className="text-xl m-3">{gadget.description}</p>
      {/*Available Card Button in each Role */}
      {isAdmin ? (
        <div className="admin-actions space-x-6 mb-2">
          <Button>
            <Link to={`admin/${gadget.id}`}>
              <Edit />
            </Link>
          </Button>
          <Button onClick={() => removeGadget(gadget.id)}>
            <Link to="admin">
              <TrashIcon />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="admin-actions">
          <Button onClick={handleAddGadgetToCart}>
            <ShoppingCart size="2rem" />
          </Button>
        </div>
      )}
    </article>
  );
}
