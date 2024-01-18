import { createAction, createSlice } from '@reduxjs/toolkit';
import { getCategoryLocalStorage } from 'Util/Category';

import {
  UPDATE_CATEGORY_PRODUCTS,
  UPDATE_COLOR_FILTER,
  UPDATE_PRICE_FILTER } from './CategoryReducer.config';

const getInitialState = () => {
  if (!getCategoryLocalStorage()) {
    return {
      category: {
        name: '',
        products: [],
        filters: {
          price: {
            minPrice: 0,
            maxPrice: 9999
          },
          color: []
        }
      }
    };
  }

  const {
    name = '',
    products = [],
    filters: {
      price: {
        minPrice,
        maxPrice
      },
      colors = []
    }
  } = getCategoryLocalStorage();

  return {
    category: {
      name: name,
      products: products,
      filters: {
        price: {
          minPrice: minPrice,
          maxPrice: maxPrice
        },
        colors: colors
      }
    }
  };
};

export const updateCategoryProducts = createAction(UPDATE_CATEGORY_PRODUCTS);
export const updatePriceFilter = createAction(UPDATE_PRICE_FILTER);
export const updateColorFilter = createAction(UPDATE_COLOR_FILTER);

export const CategorySlice = createSlice({
  name: 'CategoryReducer',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCategoryProducts, (state, action) => {
      const {
        payload: {
          name,
          products
        }
      } = action;

      state.category.name = name;
      state.category.products = products;
    }
    );
    builder.addCase(updatePriceFilter, (state, action) => {
      const {
        payload
      } = action;

      state.category.filters.price.minPrice = payload[0];
      state.category.filters.price.maxPrice = payload[1];
    }
    );
    builder.addCase(updateColorFilter, (state, action) => {
      const {
        payload
      } = action;

      state.category.filters.colors = payload;
    }
    );
  }
});

export default CategorySlice.reducer;
