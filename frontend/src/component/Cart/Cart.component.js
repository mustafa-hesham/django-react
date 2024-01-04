import './Cart.style.scss';

import CartItem from 'Component/CartItem';
import Overlay from 'Component/Overlay';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateToggleCartOverlay } from 'Store/Cart/CartReducer.reducer';
import CartIcon from 'Style/icons/Cart/cart-icon-60.png';
import { addProductToCart, removeProductFromCart } from 'Util/Cart';

import { CART, TOTAL } from './Cart.config';

export default function Cart() {
  const isCartOverlayToggled = useSelector((state) => state.CartReducer.isCartOverlayToggled);
  const cartItems = useSelector((state) => state.CartReducer.cartItems);
  const cartTotal = useSelector((state) => state.CartReducer.total);
  const numberOfItems = useSelector((state) => state.CartReducer.numberOfItems);
  const cartIconRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <div className='Cart'>
      <div
        className='Cart-CartIcon'
        onClick={ () => dispatch(updateToggleCartOverlay(!isCartOverlayToggled)) }
        ref={ cartIconRef }
      >
        { renderNumberOfItems(numberOfItems) }
        <span className='Cart-CartIcon-ImageContainer'>
          <img
            className='Cart-CartIcon-Image'
            src={ CartIcon }
          />
        </span>
      </div>
      { cartOverlay(cartIconRef, isCartOverlayToggled, cartItems, cartTotal) }
    </div>
  );
}

function cartOverlay(cartIconRef, isCartOverlayToggled, cartItems, cartTotal) {
  return (
    <div className='Cart-CartOverlay'>
      <Overlay
        buttonRef = { cartIconRef }
        isOverlayToggled = { isCartOverlayToggled }
        toggleFunction = { updateToggleCartOverlay }
        header = { renderTitle }
        body = { () => renderBody(cartItems, cartTotal) }
      />
    </div>
  );
}

function renderTitle() {
  return (
    <div className='Cart-Title'>
      <h2>{ CART }</h2>
    </div>
  );
};

function renderBody(cartItems, total) {
  if (!cartItems || !parseFloat(total)) {
    return null;
  }

  return (
    <div className='Cart-Body'>
      <div className='Cart-CartItems'>
        { cartItems.map((item, index) => <CartItem
          product={ item }
          key={ index }
          removeProduct = { removeProductFromCart }
          addProduct = { addProductToCart }
        />
        ) }
      </div>
      <div className='Cart-Separator' />
      { renderTotal(total) }
    </div>
  );
};

function renderTotal(total) {
  return (
    <div className='Cart-Total'>
      <div className='Cart-TotalTitle'>{ TOTAL }</div>
      <div className='Cart-TotalValue'>{ `$${total}` }</div>
    </div>
  );
};

function renderNumberOfItems(numberOfItems) {
  if (!numberOfItems) {
    return null;
  }

  return (
    <span className='Cart-CartIcon-Badge' >{ numberOfItems }</span>
  );
};
