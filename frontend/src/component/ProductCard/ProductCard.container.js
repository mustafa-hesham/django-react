// import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ProductType } from 'Type/Product.type';

import ProductCardComponent from './ProductCard.component';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = () => ({});

class ProductCardContainer extends PureComponent {
  static propTypes = {
    product: ProductType
  };

  containerFunctions = {};

  containerProps() {
    const {
      product
    } = this.props;

    return {
      product
    };
  }

  render() {
    const {
      product
    } = this.props;

    if (!product) {
      return null;
    }

    return (
      <ProductCardComponent
        { ...this.containerFunctions }
        { ...this.containerProps() }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardContainer);
