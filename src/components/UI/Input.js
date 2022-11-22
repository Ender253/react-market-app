import classes from "./Input.module.css";
import React from "react";

const Input = React.forwardRef((props, ref) => {
  const {label, input,} = props;
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input ref ={ref} {...input} />
    </div>
  );
});

export default Input;
