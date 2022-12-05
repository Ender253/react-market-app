import { useMemo } from "react";
import { useSelector } from "react-redux";

import { getCartAmount, getCartItems } from "../store/KartProvider";
import CartEvent from "./Cart/CartEvent";
import CartIcon from "./Cart/CartIcon";
import classes from "./NavCartButton.module.css";

const NavCartButton = (props) => {
  const items = useSelector(getCartItems);

  const numberOfCartItems = useMemo(
    () =>
      items.reduce((currentNumber, item) => {
        return currentNumber + item.quantity;
      }, 0),
    [items]
  );

  const btnClasses = useMemo(
    () => `${classes.button} ${props.addedToCart ? classes.bump : ""}`,
    [props.addedToCart]
  );

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

export default function NavCartButtonRender(props) {
  return (
    <CartEvent>
      <NavCartButton {...props} />
    </CartEvent>
  );
}
