import PropTypes from 'prop-types';
import { getProductsByCategoryName } from 'Query/Product.query';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CategoryPageComponent from './CategoryPage.component';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = () => ({});

class CategoryPageContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
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

    if (category !== prevCategory) {
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
      productsByCategory = []
    } = await getProductsByCategoryName(this.getCategory());

    this.setState({
      categoryProducts: productsByCategory
    });
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
