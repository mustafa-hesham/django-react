import './FavoritesPage.styles.scss';

import Header from 'Component/Header';
import ProductCard from 'Component/ProductCard';
import { useSelector } from 'react-redux';
import { getGuestFavorites } from 'Util/Favorites';

export default function FavoritesPage() {
  const customerFavorites = useSelector((state) => state.CustomerReducer.customer.favorites);
  const currentFavorites = Array.isArray(customerFavorites) && customerFavorites.length ?
    customerFavorites :
    getGuestFavorites();

  return (
    <div className='FavoritesPage'>
      <Header />
      <div className='FavoritesPage-Body'>
        { renderProductListGrid(currentFavorites) }
      </div>
    </div>
  );
};

function renderProductCards(categoryProducts) {
  if (!categoryProducts || !categoryProducts.length) {
    return null;
  }

  return categoryProducts.map((product, index) => <ProductCard key={ index } product={ product } />);
};

function renderProductListGrid(categoryProducts) {
  return (
    <div className='FavoritesPage-ProductList CategoryPage-ProductList'>
      { renderProductCards(categoryProducts) }
    </div>
  );
};
