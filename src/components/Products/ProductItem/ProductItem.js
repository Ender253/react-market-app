import { useCartEventDispatch } from "../../Cart/CartEvent";
import classes from "./ProductItem.module.css";
import ProductItemForm from "./ProductItemForm";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getCartItems } from "../../../store/KartProvider";
import { useTranslation } from "react-i18next";

const ProductItem = (props) => {
  const items = useSelector(getCartItems);
  const dispatch = useDispatch();
const {t} = useTranslation();

  const addItemToCart = useCartEventDispatch();
  const addToCartHandler = () => {
    addItemToCart();
    dispatch(addToCart({ id: props.id, name: props.name, price: props.price }));
  };

  // console.log(items);

  return (
    <li className={classes.product}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{  t('price',{amount: props.price.toFixed(2)})        }</div>
      </div>
      <div>
        <ProductItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default ProductItem;
