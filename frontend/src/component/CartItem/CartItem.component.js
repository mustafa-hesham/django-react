import './CartItem.styles.scss';

import QuantityChanger from 'Component/QuantityChanger';
import { useDispatch } from 'react-redux';
import { ReactComponent as RemoveIcon } from 'Style/icons/RemoveIcon/remove-icon.svg';

export default function CartItem(props) {
  const {
    product,
    removeProduct,
    addProduct,
    product: {
      name,
      price,
      cartQuantity,
      variants: {
        image,
        color: {
          name: colorName = ''
        }
      },
      id: productID
    }
  } = props;

  if (!cartQuantity) {
    return null;
  }

  const dispatch = useDispatch();

  return (
    <div className='CartItem'>
      { renderImage(image) }
      { renderName(name) }
      { renderQuantity(addProduct, product, dispatch) }
      { renderItemTotalPrice(price, cartQuantity) }
      { renderRemoveItem(productID, colorName, dispatch, removeProduct) }
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

function renderImage(image) {
  if (!image) {
    return null;
  }

  return (
    <div className='CartItem-Images'>
      <img className='CartItem-Image' src={ `static/media/${image}` } />
    </div>
  );
};

function renderItemTotalPrice(price, cartQuantity) {
  if (!price || !cartQuantity) {
    return null;
  }

  return (
    <div className='CartItem-Price'>
      { `$${(price * cartQuantity).toFixed(2)}` }
    </div>
  );
};

function renderQuantity(addProduct, product, dispatch) {
  return (
    <div className='CartItem-Quantity'>
      <QuantityChanger addProduct={ addProduct } product={ product } dispatch={ dispatch } />
    </div>
  );
};

function renderRemoveItem(productID, colorName, dispatch, removeProduct) {
  return (
    <div className='CartItem-RemoveItem'>
      <RemoveIcon
        className='CartItem-RemoveItemIcon'
        onClick={ () => removeProduct(productID, colorName, dispatch) }
      />
    </div>
  );
};
