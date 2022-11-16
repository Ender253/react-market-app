import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isTenDigits = (value) => value.length === 10;
const isSixDigits = (value) => value.length === 6;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    phone: true,
    postal: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const phoneInputRef = useRef();
  const postalInputRef = useRef(); 

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPhoneIsValid = isTenDigits(enteredPhone);
    const enteredPostalCodeIsValid = isSixDigits(enteredPostalCode);
    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      phone: enteredPhoneIsValid,
      psotal: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid && enteredStreetIsValid && enteredPhoneIsValid && enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      phone: enteredPhone,
      postal: enteredPostalCode,
    });
  };

  const nameControl = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControl = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const phoneControl = `${classes.control} ${
    formInputValidity.phone ? "" : classes.invalid
  }`;
  const postalControl = `${classes.control} ${
    formInputValidity.postal ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControl}>
        <label htmlFor="name">Nume</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputValidity.name && <p>Introduceti un nume !</p>}
      </div>
      <div className={streetControl}>
        <label htmlFor="street">Adresa</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!formInputValidity.street && <p>Introduceti un oras!</p>}
      </div>
      <div className={postalControl}>
        <label htmlFor="postal">Cod Postal</label>
        <input type="text" id="postal" ref={postalInputRef}></input>
        {!formInputValidity.postal && <p>Introduceti un cod postal valid!</p>}
      </div>
      <div className={phoneControl}>
        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone" ref={phoneInputRef}></input>
        {!formInputValidity.phone && <p>Introduceti un numar de telefon valid!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button onClick={confirmHandler} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
