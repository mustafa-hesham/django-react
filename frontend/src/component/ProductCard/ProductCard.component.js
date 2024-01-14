import './ProductCard.style.scss';

import AddToCart from 'Component/AddToCart';
import { getProductImages } from 'Util/Product';

export default function ProductCard(props) {
  const {
    product,
    product: {
      name = '',
      variants,
      price = 0.00
    }
  } = props;

  const sortedVariantsByOrder = variants.slice().sort((a, b) => a.productvariant.order - b.productvariant.order);

  return (
    <div className='ProductCard'>
      { renderProductImages(getProductImages(sortedVariantsByOrder, false)) }
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

function renderProductImages(variantsImages) {
  if (!variantsImages) {
    return null;
  }

  return (
    <div className='ProductCard-Images'>
      <img className='ProductCard-Image' src={ `static/media/${variantsImages[0]}` } />
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
