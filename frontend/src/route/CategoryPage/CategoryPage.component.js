import './CategoryPage.style.scss';

import CategoryPageFilters from 'Component/CategoryPageFilters';
import Header from 'Component/Header';
import ProductCard from 'Component/ProductCard';
import { getProductsByCategoryName } from 'Query/Product.query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateCategoryProducts, updateFilteredProducts } from 'Store/Category/CategoryReducer.reducer';
import {
  getCategoryLocalStorage,
  getCategoryProductsUniqueColors,
  getCategoryProductsUniqueSizes,
  updateCategoryLocalStorage } from 'Util/Category';
import { getProductColors, getProductUniqueSizes } from 'Util/Product';

export default function CategoryPage() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const categoryProducts = useSelector((state) => state.CategoryReducer?.category?.products);
  const uniqueProductsColors = getCategoryProductsUniqueColors(categoryProducts);
  const uniqueProductsSizes = getCategoryProductsUniqueSizes(categoryProducts);

  const filters = useSelector((state) => state.CategoryReducer?.category?.filters);
  const filteredCategoryProducts = categoryProducts.filter((product) => {
    const uniqueProductColors = getProductColors(product.variants).map((color) => color[0]);
    const uniqueProductSizes = getProductUniqueSizes(product);

    return parseFloat(product.price) >= filters.price.minPrice &&
    parseFloat(product.price) <= filters.price.maxPrice && (!filters.colors.length || filters.colors.find(
        (stateColor) => uniqueProductColors.some((productColor) => stateColor.name === productColor.name)
    )) && (!filters.sizes.length || filters.sizes.find(
        (stateSize) => uniqueProductSizes.some((productSize) => stateSize === productSize)
    ));
  });

  const modifiedFilters = {
    ...filters,
    filteredProducts: filteredCategoryProducts
  };

  useEffect(() => {
    getCategoryProducts(category, filters, dispatch);
  }, [category]);

  useEffect(() => {
    updateCategoryLocalStorage(category, categoryProducts, modifiedFilters);
    if (JSON.stringify(filters.filteredProducts) !== JSON.stringify(filteredCategoryProducts)) {
      dispatch(updateFilteredProducts(filteredCategoryProducts));
    }
  }, [filters]);

  return (
    <div className='CategoryPage'>
      <Header />
      <div className='CategoryPage-Body'>
        <CategoryPageFilters colors={ uniqueProductsColors } sizes = { uniqueProductsSizes }/>
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
};

async function getCategoryProductsQuery(category, filters, dispatch) {
  const {
    productsByCategory = [],
    message: errorMessage
  } = await getProductsByCategoryName(category);
  console.log(productsByCategory, errorMessage);
  if (!errorMessage) {
    dispatch(updateCategoryProducts({ name: category, products: productsByCategory }));
    updateCategoryLocalStorage(category, productsByCategory, filters);
  }
};
