import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";

import { useState } from "react";
import Cart from "./components/Cart/Cart";

import CartProvider from "./store/CartProvider";
import ControlledCarousel from "./components/Carousel";
import Products from "./components/Products/Products";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <NavBar onShowCart={showCartHandler} />
      <ControlledCarousel />
      <Products />
    </CartProvider>
  );
}

export default App;
