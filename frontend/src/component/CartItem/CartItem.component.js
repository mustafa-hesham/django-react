import './CartItem.styles.scss';

export default function CartItem(props) {
  const {
    product: {
      name,
      price,
      quantity,
      images
    }
  } = props;

  if (!quantity) {
    return null;
  }

  return (
    <div className='CartItem'>
      { renderImage(images) }
      { renderName(name) }
      { renderQuantity(quantity) }
      { renderProductPrice(price) }
    </div>
  );
};

function renderName(name) {
  return (
    <div className='CartItem-Name'>
      { name }
    </div>
  );
};

function renderImage(images) {
  if (!images) {
    return null;
  }

  return (
    <div className='CartItem-Images'>
      <img className='CartItem-Image' src={ `static/media/${images}` } />
    </div>
  );
};

function renderProductPrice(price) {
  if (!price) {
    return null;
  }

  return (
    <div className='CartItem-Price'>
      { `$${price}` }
    </div>
  );
};

function renderQuantity(quantity) {
  return (
    <div className='CartItem-Quantity'>
      { quantity }
    </div>
  );
};
