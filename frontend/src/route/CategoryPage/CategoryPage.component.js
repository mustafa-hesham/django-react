import './CategoryPage.style.scss';

import Header from 'Component/Header';
import ProductCard from 'Component/ProductCard';
import { getProductsByCategoryName } from 'Query/Product.query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateCategoryProducts } from 'Store/Category/CategoryReducer.reducer';
import { getCategoryLocalStorage, updateCategoryLocalStorage } from 'Util/Category';

export default function CategoryPage() {
  const dispatch = useDispatch();
  const categoryProducts = useSelector((state) => state.CategoryReducer?.category.products);
  const { category } = useParams();

  useEffect(() => {
    getCategoryProducts(category, dispatch);
  }, [category]);

  return (
    <div className='CategoryPage'>
      <Header />
      { renderProductListGrid(categoryProducts) }
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
    <div className='CategoryPage-ProductList'>
      { renderProductCards(categoryProducts) }
    </div>
  );
};

async function getCategoryProducts(category, dispatch) {
  if (!getCategoryLocalStorage()) {
    getCategoryProductsQuery(category, dispatch);
    return;
  }

  const {
    name: localStorageCategoryName = '',
    products: localStorageProducts = []
  } = getCategoryLocalStorage();

  if (localStorageCategoryName === category && Array.isArray(localStorageProducts)) {
    dispatch(updateCategoryProducts({ name: category, products: localStorageProducts }));
  } else {
    getCategoryProductsQuery(category, dispatch);
  }
}

async function getCategoryProductsQuery(category, dispatch) {
  const {
    productsByCategory = [],
    message: errorMessage
  } = await getProductsByCategoryName(category);

  if (!errorMessage) {
    dispatch(updateCategoryProducts({ name: category, products: productsByCategory }));
    updateCategoryLocalStorage(category, productsByCategory);
  }
}
