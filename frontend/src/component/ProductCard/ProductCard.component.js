import './ProductCard.style.scss';

import { useDispatch } from 'react-redux';
import { addProductToCart } from 'Util/Cart';

export default function ProductCard(props) {
  const dispatch = useDispatch();

  const {
    product: {
      name = '',
      images = '',
      price = 0.00
    }
  } = props;

  return (
    <div className='ProductCard'>
      { renderProductImage(images) }
      { renderProductName(name) }
      { renderProductPrice(price) }
      { renderAddToCart(props, dispatch) }
    </div>
  );
};

function renderProductName(name) {
  if (!name) {
    return null;
  }

  return (
    <div className='ProductCard-Name'>
      { name }
    </div>
  );
}

function renderProductImage(images) {
  if (!images) {
    return null;
  }

  return (
    <div className='ProductCard-Images'>
      <img className='ProductCard-Image' src={ `static/media/${images}` } />
    </div>
  );
};

function renderProductPrice(price) {
  if (!price) {
    return null;
  }

  return (
    <div className='ProductCard-Price'>
      { `$${price}` }
    </div>
  );
};

function renderAddToCart(props, dispatch) {
  const {
    product
  } = props;

  return (
    <div
      className='ProductCard-AddToCart'
      onClick={ () => addProductToCart(product, 1, dispatch) }
    >
      <p>Add to cart</p>
    </div>
  );
};
