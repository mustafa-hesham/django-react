import PropTypes from 'prop-types';
import { getProductsByCategoryName } from 'Query/Product.query';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateCategoryProducts } from 'Store/Category/CategoryReducer.reducer';
import { ProductType } from 'Type/Product.type';
import { getCategoryLocalStorage, updateCategoryLocalStorage } from 'Util/Category';

import CategoryPageComponent from './CategoryPage.component';

export const mapStateToProps = (state) => ({
  categoryName: state.CategoryReducer?.category.name,
  categoryProducts: state.CategoryReducer?.category.products
});

export const mapDispatchToProps = (dispatch) => ({
  updateCategoryData: ({ name, products }) => dispatch(updateCategoryProducts({ name, products }))
});

class CategoryPageContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    updateCategoryData: PropTypes.func.isRequired,
    categoryName: PropTypes.string,
    categoryProducts: PropTypes.arrayOf(ProductType)
  };

  static defaultProps = {
    categoryName: '',
    categoryProducts: []
  };

  containerFunctions = {};

  componentDidUpdate(prevProps) {
    const {
      categoryName,
      match: {
        params: {
          category
        }
      }
    } = this.props;

    const {
      match: {
        params: {
          category: prevCategory
        }
      }
    } = prevProps;

    if (category !== prevCategory || !categoryName) {
      this.getCategoryProducts();
    }
  }

  getCategory() {
    const {
      match: {
        params: {
          category
        }
      }
    } = this.props;

    return category;
  }

  async getCategoryProducts() {
    const {
      updateCategoryData
    } = this.props;

    const category = this.getCategory();
    const {
      name: localStorageCategoryName,
      products: localStorageProducts
    } = getCategoryLocalStorage();

    if (localStorageCategoryName === category && Array.isArray(localStorageProducts)) {
      updateCategoryData({ name: category, products: localStorageProducts });
    } else {
      const {
        productsByCategory = []
      } = await getProductsByCategoryName(category);
      updateCategoryData({ name: category, products: productsByCategory });
      updateCategoryLocalStorage(category, productsByCategory);
    }
  }

  containerProps() {
    const {
      categoryProducts
    } = this.props;

    return {
      category: this.getCategory(),
      categoryProducts
    };
  };

  render() {
    return (
      <CategoryPageComponent
        { ...this.containerFunctions }
        { ...this.containerProps() }
      />
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPageContainer));
