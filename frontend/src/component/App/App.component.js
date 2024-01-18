import './App.scss';

import Header from 'Component/Header';
import Router from 'Component/Router';
import { useEffect } from 'react';
import { NotificationContainer } from 'react-notifications';
import { Provider } from 'react-redux';
import { getStore } from 'Store';
import { getCart, setCart } from 'Util/Cart';
import { getCategoryLocalStorage, updateCategoryLocalStorage } from 'Util/Category';
import { refreshAuthTokensTimeout } from 'Util/Token';

export default function App() {
  useEffect(initializeReducers, []);
  const store = getStore();

  return (
    <Provider store={ store }>
      <div className="App">
        <NotificationContainer />
        <Router>
          <Header />
        </Router>
      </div>
    </Provider>
  );
};

function initializeReducers() {
  if (!getCategoryLocalStorage()) {
    updateCategoryLocalStorage(
        '',
        [],
        {
          price: {
            minPrice: 0,
            maxPrice: 9999
          }
        }
    );
  }

  const {
    cartItems = []
  } = getCart();

  setCart(cartItems);
  refreshAuthTokensTimeout();
};
