import './FavoritesPage.styles.scss';

import Header from 'Component/Header';
import ProductCard from 'Component/ProductCard';
import { useSelector } from 'react-redux';

export default function FavoritesPage() {
  const categoryProducts = useSelector((state) => state.CategoryReducer?.category?.products);

  return (
    <div className='FavoritesPage'>
      <Header />
      <div className='FavoritesPage-Body'>
        { renderProductListGrid(categoryProducts) }
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
