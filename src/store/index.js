import { configureStore } from "@reduxjs/toolkit";
import CartReducer from './KartProvider'

const store = configureStore({
    reducer: {cart : CartReducer},
})

export default store;