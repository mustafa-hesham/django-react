import './Cart.style.scss';

import Overlay from 'Component/Overlay';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateToggleCartOverlay } from 'Store/Cart/CartReducer.reducer';
import CartIcon from 'Style/icons/Cart/cart-icon-60.png';

export default function Cart() {
  const isCartOverlayToggled = useSelector((state) => state.CartReducer.isCartOverlayToggled);
  const cartIconRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <div className='Cart'>
      <img
        className='Cart-CartIcon'
        src={ CartIcon }
        ref={ cartIconRef }
        onClick={ () => dispatch(updateToggleCartOverlay(!isCartOverlayToggled)) }
      />
      { cartOverlay(cartIconRef, isCartOverlayToggled) }
    </div>
  );
}

function cartOverlay(cartIconRef, isCartOverlayToggled) {
  return (
    <div className='Cart-CartOverlay'>
      <Overlay
        buttonRef = { cartIconRef }
        isOverlayToggled = { isCartOverlayToggled }
        toggleFunction = { updateToggleCartOverlay }
        header = { renderTitle }
      />
    </div>
  );
}

function renderTitle() {
  return (
    <div className='Cart-Title'>
      <h2>Cart</h2>
    </div>
  );
};
