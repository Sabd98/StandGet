import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../store/cartSelectors";
import { showCart } from "../store/progressSlice";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../hooks/authContext";
import { Link } from "react-router";

export default function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { logout, user } = useAuth();
  const isAuth = user?.role;

  //Cart Items Handler and Auth Logic
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartButton = isAuth === "user" && (
    <Button textOnly onClick={() => dispatch(showCart())}>
      <span className="flex">
        <ShoppingCart size="2rem" color="black" /> Cart ({totalCartItems})
      </span>
    </Button>
  );

  //Header Navigation Handler

  const adminNav = isAuth === "admin" && (
    <nav className="space-x-4 mt-2 text-3xl text-black">
      <Button type="button" textOnly>
        <Link to="/">Home</Link>
      </Button>
      <Button type="button" textOnly>
        <Link to="/admin/add">Add Product</Link>
      </Button>
      <Button type="button" textOnly>
        <Link to="/admin/history">Order History</Link>
      </Button>
    </nav>
  );
  return (
    <header id="main-header">
      <div className="flex-none md:flex gap-16">
        <h1 id="title">StandGet</h1>
        {adminNav}
      </div>
      <nav className="flex gap-5">
        {cartButton}
        <Button onClick={logout}>Logout</Button>
      </nav>
    </header>
  );
}
