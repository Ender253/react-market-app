import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";

import { useState } from "react";
import Cart from "./components/Cart/Cart";
import './i18n'


import ControlledCarousel from "./components/Carousel";
import Products from "./components/Products/Products";
import { useProductCategories } from "./components/Products/ProductItem/ProductCategories";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const categoriesHook = useProductCategories();

  return (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <NavBar onShowCart={showCartHandler} {...categoriesHook} />
      <ControlledCarousel />
      <Products {...categoriesHook} />
    </>
  );
}

export default App;
