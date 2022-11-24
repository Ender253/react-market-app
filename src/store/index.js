import { configureStore } from "@reduxjs/toolkit";
import CartSlice from './cart'

const store = configureStore({
    reducer: {cart : CartSlice.reducer},
})

export default store;