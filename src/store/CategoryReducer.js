import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  categoryId: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
  },
});

const selectSelf = (state) => state.category;
export const getSelectedCategoryId = createSelector(
  selectSelf,
  (state) => state.categoryId
);

export const { setCategoryId } = categorySlice.actions;

export default categorySlice.reducer;
