import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
    
      if (!state.items?.length) {
        state.items = initialState.items;
      }

      const existingCartItemIndex = state.items.findIndex((itm) => itm.id === item.id);
      
      if (existingCartItemIndex > -1) {
        const existingCartItem = state.items[existingCartItemIndex];
        let quantity = existingCartItem.quantity || 0;

        existingCartItem.quantity = ++quantity;
  
        state.items.splice(existingCartItemIndex, 1, existingCartItem);  
      }  else {
        item.quantity = 1;

        state.items.push(item);  
      }
    },
    removeCart(state, action) {
      const id = action.payload;

      const existingCartItemIndex = state.items.findIndex((itm) => itm.id === id);

      if(existingCartItemIndex > -1) {
        if(state.items[existingCartItemIndex].quantity > 1){
          state.items[existingCartItemIndex].quantity = state.items[existingCartItemIndex].quantity - 1;
        }else{
   state.items.splice(existingCartItemIndex, 1);
        }
      }
    },
    clearCart() {
      return {...initialState};
    },
  },
});

const selectSelf = (state) => state.cart;
export const cartSelector = createSelector(selectSelf, (state) => state);
export const getCartItems = createSelector(selectSelf, (state) => state.items);
export const getCartAmount = createSelector(
  selectSelf,
  (state) => state.items.reduce( function(totalAmount, item){
    return totalAmount + getItemAmount(item);
}, 0)
);

export function getItemAmount(item){
  return item.quantity * item.price;
}

export const { addToCart, removeCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
