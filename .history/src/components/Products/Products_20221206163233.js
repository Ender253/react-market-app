import React from "react";
import AvailableProducts from "./AvailableProducts";

const Products = (props) => {
  return (
    <React.Fragment>
      {<AvailableProducts  {...props} />}
    </React.Fragment>
  ); 
};

export default Products;
