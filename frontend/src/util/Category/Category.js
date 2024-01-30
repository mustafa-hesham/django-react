import { MAX_VALUE } from 'Component/RangeFilter/RangerFilter.config';
import { updateColorFilter, updatePriceFilter, updateSizesFilter } from 'Store/Category/CategoryReducer.reducer';
import { getProductColors } from 'Util/Product';

import { CATEGORY } from './Category.config';

export function updateCategoryLocalStorage(name, products, filters) {
  const category = {
    name,
    products,
    filters
  };

  localStorage.setItem(CATEGORY, JSON.stringify(category));
}

export function getCategoryLocalStorage() {
  const category = localStorage.getItem(CATEGORY);

  return category ? JSON.parse(category) : null;
}

export function removeCategoryLocalStorage() {
  localStorage.removeItem(CATEGORY);
}

export function getCategoryProductsUniqueColors(categoryProducts) {
  const colors = [];
  categoryProducts.forEach(
      (product) => {
        const {
          variants
        } = product;

        getProductColors(variants).forEach((color) => {
          if (colors.indexOf(color) === -1) {
            colors.push(color[0]);
          }
        });
      }
  );

  return colors;
}

export function getCategoryProductsUniqueSizes(categoryProducts) {
  const sizes = [];
  categoryProducts.forEach(
      (product) => {
        const {
          variants
        } = product;

        variants.forEach((variant) => {
          variant.productsizecollectionSet.forEach((size) => {
            if (sizes.indexOf(size.size.name) === -1) {
              sizes.push(size.size.name);
            }
          });
        });
      }
  );

  return sizes;
}

export function resetAllFilters(dispatch) {
  dispatch(updateColorFilter([]));
  dispatch(updateSizesFilter([]));
  dispatch(updatePriceFilter([0, MAX_VALUE]));
}
