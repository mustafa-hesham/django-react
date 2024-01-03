import './ProductCard.style.scss';

import AddToCart from 'Component/AddToCart';

export default function ProductCard(props) {
  const {
    product,
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
      { renderAddToCart(product) }
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

function renderAddToCart(product) {
  return (
    <div
      className='ProductCard-AddToCart'
    >
      <AddToCart product={ product } />
    </div>
  );
};
