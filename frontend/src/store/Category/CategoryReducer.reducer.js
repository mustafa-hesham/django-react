import { createAction, createSlice } from '@reduxjs/toolkit';
import { getCategoryLocalStorage } from 'Util/Category';

import { UPDATE_CATEGORY_PRODUCTS } from './CategoryReducer.config';

const getInitialState = () => {
  if (!getCategoryLocalStorage()) {
    return {
      category: {
        name: '',
        products: []
      }
    };
  }

  const {
    name = '',
    products = []
  } = getCategoryLocalStorage();

  return {
    category: {
      name: name,
      products: products
    }

  };
};

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
