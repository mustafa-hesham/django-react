import './CategoryPage.style.scss';

import CategoryPageFilters from 'Component/CategoryPageFilters';
import Header from 'Component/Header';
import ProductCard from 'Component/ProductCard';
import { getProductsByCategoryName } from 'Query/Product.query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateCategoryProducts } from 'Store/Category/CategoryReducer.reducer';
import { getCategoryLocalStorage, updateCategoryLocalStorage } from 'Util/Category';

export default function CategoryPage() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const categoryProducts = useSelector((state) => state.CategoryReducer?.category?.products);
  const filters = useSelector((state) => state.CategoryReducer?.category?.filters);
  const filteredCategoryProducts = categoryProducts.filter((product) => {
    return parseFloat(product.price) >= filters.price.minPrice &&
    parseFloat(product.price) <= filters.price.maxPrice;
  });

  useEffect(() => {
    getCategoryProducts(category, filters, dispatch);
  }, [category]);

  useEffect(() => {
    updateCategoryLocalStorage(category, categoryProducts, filters);
  }, [filters]);

  return (
    <div className='CategoryPage'>
      <Header />
      <div className='CategoryPage-Body'>
        <CategoryPageFilters />
        { renderProductListGrid(filteredCategoryProducts) }
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
    <div className='CategoryPage-ProductList'>
      { renderProductCards(categoryProducts) }
    </div>
  );
};

async function getCategoryProducts(category, filters = {}, dispatch) {
  if (!getCategoryLocalStorage()) {
    getCategoryProductsQuery(category, filters, dispatch);
    return;
  }

  const {
    name: localStorageCategoryName = '',
    products: localStorageProducts = []
  } = getCategoryLocalStorage();

  if (localStorageCategoryName === category && Array.isArray(localStorageProducts)) {
    dispatch(updateCategoryProducts({ name: category, products: localStorageProducts }));
  } else {
    getCategoryProductsQuery(category, filters, dispatch);
  }
}

async function getCategoryProductsQuery(category, filters, dispatch) {
  const {
    productsByCategory = [],
    message: errorMessage
  } = await getProductsByCategoryName(category);

  if (!errorMessage) {
    dispatch(updateCategoryProducts({ name: category, products: productsByCategory }));
    updateCategoryLocalStorage(category, productsByCategory, filters);
  }
}
