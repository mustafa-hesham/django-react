import './AddToCart.style.scss';

import { useDispatch, useSelector } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import { updateToggleCartOverlay } from 'Store/Cart/CartReducer.reducer';
import { addProductToCart } from 'Util/Cart';

import { ADD_TO_CART } from './AddToCart.config';

export default function AddToCart(props) {
  const {
    product
  } = props;

  const dispatch = useDispatch();
  const isCartOverlayToggled = useSelector((state) => state.CartReducer.isCartOverlayToggled);
  const isAccountOverlayToggled = useSelector((state) => state.AccountOverlayReducer.isAccountOverlayToggled);
  const cartItems = useSelector((state) => state.CartReducer.cartItems);
  const currentCartProduct = cartItems.find((item) => item.id === product.id);

  const {
    cartQuantity = 0
  } = currentCartProduct || {};

  return (
    <div
      className='AddToCart'
      onClick={ () => addProduct(product, dispatch, isCartOverlayToggled, isAccountOverlayToggled, cartQuantity) }
    >
      { ADD_TO_CART }
    </div>
  );
};

function addProduct(product, dispatch, isCartOverlayToggled, isAccountOverlayToggled, cartQuantity) {
  const {
    quantity
  } = product;

  if (isAccountOverlayToggled) {
    dispatch(updateToggleAccountOverlay(!isAccountOverlayToggled));
  }

  if (cartQuantity >= quantity) {
    return;
  }

  addProductToCart(product, 1, dispatch);

  if (!isCartOverlayToggled) {
    dispatch(updateToggleCartOverlay(true));
  }
};
