import AccountCreated from 'Route/AccountCreated';
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
  },
  {
    path: '/new_account/:firstName/:lastName/:email/:birthDate',
    element: <AccountCreated />
  }
];
