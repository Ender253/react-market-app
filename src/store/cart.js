import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },
    addItemCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalAmount++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          amount: 1,
          totalPrice: newItem.price,
          price: newItem.price,
        });
      }else{
        existingItem.amount++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price
      }
    },
    removeItemcart(state,action){
        const id = action.payload;
        const existingItem = state.items.find((item)=> item.id === id)
        state.totalAmount--;
        state.changed = true;
        if(existingItem.amount === 1){
            state.items = state.items.filter((item)=> item.id !== id )
        }else{
            existingItem.amount--;
            existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
    }
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice;
