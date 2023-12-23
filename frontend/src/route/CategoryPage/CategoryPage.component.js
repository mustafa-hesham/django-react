import './CategoryPage.style.scss';

import Header from 'Component/Header';
import ProductCard from 'Component/ProductCard';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { ProductType } from 'Type/Product.type';

class CategoryPageComponent extends PureComponent {
  static propTypes = {
    category: PropTypes.string.isRequired,
    categoryProducts: PropTypes.arrayOf(ProductType)
  };

  static defaultProps = {
    categoryProducts: []
  };

  renderProductCards() {
    const {
      categoryProducts
    } = this.props;

    if (!categoryProducts || !categoryProducts.length) {
      return null;
    }

    return categoryProducts.map((product, index) => <ProductCard key={ index } product={ product } />);
  }

  renderProductListGrid() {
    return (
      <div className='CategoryPage-ProductList'>
        { this.renderProductCards() }
      </div>
    );
  }

  render() {
    return (
      <div className='CategoryPage'>
        <Header />
        { this.renderProductListGrid() }
      </div>
    );
  }
}

export default CategoryPageComponent;
