import { createAction, createSlice } from '@reduxjs/toolkit';
import { getCategoryLocalStorage } from 'Util/Category';

import {
  UPDATE_CATEGORY_PRODUCTS,
  UPDATE_COLOR_FILTER,
  UPDATE_FILTERED_PRODUCTS,
  UPDATE_PRICE_FILTER,
  UPDATE_SIZE_FILTER
} from './CategoryReducer.config';

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
          colors: [],
          sizes: [],
          filteredProducts: []
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
      colors = [],
      sizes = [],
      filteredProducts = []
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
        colors: colors,
        sizes: sizes,
        filteredProducts: filteredProducts
      }
    }
  };
};

export const updateCategoryProducts = createAction(UPDATE_CATEGORY_PRODUCTS);
export const updatePriceFilter = createAction(UPDATE_PRICE_FILTER);
export const updateColorFilter = createAction(UPDATE_COLOR_FILTER);
export const updateFilteredProducts = createAction(UPDATE_FILTERED_PRODUCTS);
export const updateSizesFilter = createAction(UPDATE_SIZE_FILTER);

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
    builder.addCase(updateFilteredProducts, (state, action) => {
      const {
        payload
      } = action;

      state.category.filters.filteredProducts = payload;
    }
    );
    builder.addCase(updateSizesFilter, (state, action) => {
      const {
        payload
      } = action;

      state.category.filters.sizes = payload;
    }
    );
  }
});

export default CategorySlice.reducer;
