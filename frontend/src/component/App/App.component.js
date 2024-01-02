import './App.scss';

import Header from 'Component/Header';
import Router from 'Component/Router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { getStore } from 'Store';
import { getCart, setCart } from 'Util/Cart';
import { getCategoryLocalStorage, updateCategoryLocalStorage } from 'Util/Category';

export default function App() {
  useEffect(initializeReducers, []);
  const store = getStore();

  return (
    <Provider store={ store }>
      <div className="App">
        <Router>
          <Header />
        </Router>
      </div>
    </Provider>
  );
};

function initializeReducers() {
  if (!getCategoryLocalStorage()) {
    updateCategoryLocalStorage('', []);
  }
  const {
    cartItems = []
  } = getCart();

  setCart(cartItems);
};
