import { createAction, createSlice } from '@reduxjs/toolkit';
import { getCategoryLocalStorage } from 'Util/Category';

import { UPDATE_CATEGORY_PRODUCTS } from './CategoryReducer.config';

const getInitialState = () => ({
  category: {
    name: getCategoryLocalStorage().name ? getCategoryLocalStorage().name : '',
    products: getCategoryLocalStorage().products ? getCategoryLocalStorage().products : []
  }
});

export const updateCategoryProducts = createAction(UPDATE_CATEGORY_PRODUCTS);

export const CategorySlice = createSlice({
  name: 'CategoryReducer',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCategoryProducts, (state, action) => {
      const {
        payload
      } = action;

      state.category = payload;
    }
    );
  }
});

export default CategorySlice.reducer;
