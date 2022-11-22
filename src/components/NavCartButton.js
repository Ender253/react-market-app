import { useContext, useEffect, useState, useMemo } from "react";
import CartContext from "../store/cart-context";
import CartIcon from "./Cart/CartIcon";
import classes from "./NavCartButton.module.css";

const NavCartButton = (props) => {
  const [buttonIsHighLighted, setButtonIsHighLighted] = useState(false);
  const { items } = useContext(CartContext);

  const numberOfCartItems = useMemo(()=>items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0),[items]);

  const btnClasses = useMemo(()=>`${classes.button} ${
    buttonIsHighLighted ? classes.bump : ""
  }`,[buttonIsHighLighted]);
  
  useEffect(() => {
    console.log(items.length);
    if (items.length < 1) {
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
