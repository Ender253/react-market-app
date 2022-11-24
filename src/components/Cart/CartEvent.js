import React, { useCallback, useEffect, useState } from "react";

const CART_EVENT_NAME = "add-to-card";

export function useCartEventDispatch() {
  return useCallback(() => {
    window.dispatchEvent(new CustomEvent(CART_EVENT_NAME));
  }, []);
}

function useCartEvent() {
  const [state, setstate] = useState(false);
  const addToCart = useCallback(() => {
    setstate(true);

    return setTimeout(() => setstate(false), 500);
  }, []);

  useEffect(() => {
    window.addEventListener(CART_EVENT_NAME, addToCart);
    return () => {
      window.removeEventListener(CART_EVENT_NAME, addToCart);
    };
  }, [addToCart]);

  return { addedToCart: state };
}

export default function CartEvent(props) {
  const cartEvent = useCartEvent(props);

  return React.cloneElement(props.children, { ...cartEvent });
}
