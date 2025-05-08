import ProductCarousel from "./Carousel";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Header from "./Header";
import Products from "./Products";

export default function HomePage() {
  return (
    <>
      <Header />
      <ProductCarousel />
      <Products />
      <Cart />
      <Checkout />
    </>
  );
}
