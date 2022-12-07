import React from "react";
import AvailableProducts from "./AvailableProductss";

const Products = (props) => {
  return (
    <React.Fragment>
      {<AvailableProducts  {...props} />}
    </React.Fragment>
  ); 
};

export default Products;
