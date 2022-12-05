
import Input from "../../UI/Input";
import classes from "./ProductItemForm.module.css";


import React from "react";

const ProductItemForm = (props) => {

  const submitHandler = (event) => {
    event.preventDefault();

    props.onAddToCart();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      
    </form>
  );
};

export default ProductItemForm;
