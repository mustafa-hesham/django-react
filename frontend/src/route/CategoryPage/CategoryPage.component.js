import './CategoryPage.style.scss';

import Header from 'Component/Header';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

class CategoryPageComponent extends PureComponent {
  static propTypes = {
    category: PropTypes.string.isRequired,
    categoryProducts: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    categoryProducts: []
  };

  renderProductListGrid() {
    const {
      category,
      categoryProducts
    } = this.props;

    console.log(categoryProducts);

    return (
      <div className='CategoryPage-ProductList'>
        { category }
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
