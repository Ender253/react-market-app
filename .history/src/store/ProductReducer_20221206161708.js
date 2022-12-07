import { createSlice,createSelector } from "@reduxjs/toolkit"


const initialState ={
    state:
}

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setProductsId(state ,action){
            state.productsId = action.payload
        }
    }
})

const selectSelf = (state) => state.category;
export const getProductId = createSelector(
  selectSelf,
  (state) => state.productId
);

export const { setProductsId } = productSlice.actions;

export default productSlice.reducer;
