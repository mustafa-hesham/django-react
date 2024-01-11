import CategoryPage from 'Route/CategoryPage';
import Home from 'Route/HomePage';

export const ROUTES = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/:category',
    element: <CategoryPage />
  }
];
