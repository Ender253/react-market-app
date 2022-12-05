import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useState } from "react";

import CartItem from "./CartItem";
import Checkout from "./Checkout";
import React from "react";
import {
  addToCart,
  removeCart,
  clearCart,
  getCartAmount,
  getCartItems,
} from "../../store/KartProvider";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const {t} = useTranslation();

  const items = useSelector(getCartItems);
  const cartAmount = useSelector(getCartAmount);
  // console.log("cartStore", items);

  const dispatch = useDispatch();

  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(removeCart(id));
    
  };

  const cartItemAddHandler = (item) => {
    dispatch(addToCart(item));
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmiting(true);
    fetch(
      "https://food-app-8d033-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: items,
        }),
      }
    );
    setIsSubmiting(false);
    setDidSubmit(true);
    dispatch(clearCart());
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          item={item}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Comanda
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Pret</span>
        <span>{
          t('price',{amount: cartAmount.toFixed(2)})
        }</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmitingModalContent = <p>Trimitere date comanda</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Comanda trimisa</p>
      <div className={classes.actions}>
        <button className={classes["button"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  // console.log("cartStore", items);
  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && isSubmitingModalContent}
      {!isSubmiting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
