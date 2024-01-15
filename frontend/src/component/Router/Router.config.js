import CategoryPage from 'Route/CategoryPage';
import Home from 'Route/HomePage';
import ProductPage from 'Route/ProductPage';

export const ROUTES = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/:category',
    element: <CategoryPage />
  },
  {
    path: '/:SKU/:productName',
    element: <ProductPage />
  }
];
