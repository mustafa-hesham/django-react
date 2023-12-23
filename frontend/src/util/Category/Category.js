import { CATEGORY } from './Category.config';

export function updateCategoryLocalStorage(name, products) {
  const category = {
    name,
    products
  };

  localStorage.setItem(CATEGORY, JSON.stringify(category));
}

export function getCategoryLocalStorage() {
  const category = localStorage.getItem(CATEGORY);

  return category ? JSON.parse(category) : null;
}
