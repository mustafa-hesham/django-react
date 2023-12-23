import './ProductCard.style.scss';

import { PureComponent } from 'react';
import { ProductType } from 'Type/Product.type';

class ProductCardComponent extends PureComponent {
  static propTypes = {
    product: ProductType
  };

  renderProductName() {
    const {
      product: {
        name = ''
      } = {}
    } = this.props;

    if (!name) {
      return null;
    }

    return (
      <div className='ProductCard-Name'>
        { name }
      </div>
    );
  }

  renderProductImage() {
    const {
      product: {
        images
      }
    } = this.props;

    if (!images) {
      return null;
    }

    return (
      <div className='ProductCard-Images'>
        <img className='ProductCard-Image' src={ `static/media/${images}` } />
      </div>
    );
  }

  renderProductPrice() {
    const {
      product: {
        price = 0.00
      } = {}
    } = this.props;

    if (!price) {
      return null;
    }

    return (
      <div className='ProductCard-Price'>
        { `$${price}` }
      </div>
    );
  }

  renderAddToCart() {
    return (
      <div className='ProductCard-AddToCart'>
        <p>Add to cart</p>
      </div>
    );
  }

  render() {
    return (
      <div className='ProductCard'>
        { this.renderProductImage() }
        { this.renderProductName() }
        { this.renderProductPrice() }
        { this.renderAddToCart() }
      </div>
    );
  }
}

export default ProductCardComponent;
