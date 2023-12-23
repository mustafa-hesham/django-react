import PropTypes from 'prop-types';
import { getProductsByCategoryName } from 'Query/Product.query';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateCategoryProducts } from 'Store/Category/CategoryReducer.reducer';
import { getCategoryLocalStorage, updateCategoryLocalStorage } from 'Util/Category';

import CategoryPageComponent from './CategoryPage.component';

export const mapStateToProps = (state) => ({
  categoryName: state.CategoryReducer.category.name
});

export const mapDispatchToProps = (dispatch) => ({
  updateCategoryData: ({ name, products }) => dispatch(updateCategoryProducts({ name, products }))
});

class CategoryPageContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    updateCategoryData: PropTypes.func.isRequired,
    categoryName: PropTypes.string.isRequired
  };

  state = {
    categoryProducts: []
  };

  containerFunctions = {};

  componentDidMount() {
    this.getCategoryProducts();
  }

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

    if (category === localStorageCategoryName) {
      this.setState({
        categoryProducts: localStorageProducts
      });

      return;
    } else {
      const {
        productsByCategory = []
      } = await getProductsByCategoryName(category);

      updateCategoryData({ name: category, products: productsByCategory });
      updateCategoryLocalStorage(category, productsByCategory);

      this.setState({
        categoryProducts: productsByCategory
      });
    }
  }

  containerProps() {
    const {
      categoryProducts
    } = this.state;

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
