import { useContext, useEffect, useState } from "react";
import CartContext from "../store/cart-context";
import CartIcon from "./Cart/CartIcon";
import classes from "./NavCartButton.module.css";

const NavCartButton = (props) => {
  const [buttonIsHighLighted, setButtonIsHighLighted] = useState(false);
  const cartCxt = useContext(CartContext);
  const { items } = cartCxt;
  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    buttonIsHighLighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonIsHighLighted(true);

    const timer = setTimeout(() => {
      setButtonIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Cosul tau</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default NavCartButton;
