import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./CategoryReducer";
import CartReducer from './KartProvider'
import ProductReducer from "./ProductReducer";

const store = configureStore({
    reducer: {cart : CartReducer, category: CategoryReducer, products: ProductReducer},
})

export default store;