import './CartItem.styles.scss';

import QuantityChanger from 'Component/QuantityChanger';
import { useDispatch } from 'react-redux';
import { ReactComponent as RemoveIcon } from 'Style/icons/RemoveIcon/remove-icon.svg';
import { getMediaLink } from 'Util/Product';

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
        images,
        color: {
          name: colorName = ''
        },
        productsizecollectionSet: {
          size: {
            name: sizeName
          }
        }
      },
      id: productID
    }
  } = props;
  console.log(sizeName);
  if (!cartQuantity) {
    return null;
  }

  const dispatch = useDispatch();

  return (
    <div className='CartItem'>
      { renderImage(images) }
      { renderName(name) }
      { renderSize(sizeName) }
      { renderQuantity(addProduct, product, dispatch) }
      { renderItemTotalPrice(price, cartQuantity) }
      { renderRemoveItem(productID, colorName, sizeName, dispatch, removeProduct) }
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
  const {
    image
  } = images[0];

  return (
    <div className='CartItem-Images'>
      <img className='CartItem-Image' src={ getMediaLink(image) } />
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

function renderRemoveItem(productID, colorName, sizeName, dispatch, removeProduct) {
  return (
    <div className='CartItem-RemoveItem'>
      <RemoveIcon
        className='CartItem-RemoveItemIcon'
        onClick={ () => removeProduct(productID, colorName, sizeName, dispatch) }
      />
    </div>
  );
};

function renderSize(sizeName) {
  return (
    <div className='CartItem-Size'>
      { sizeName }
    </div>
  );
}
