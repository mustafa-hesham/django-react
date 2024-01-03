import './AddToCart.style.scss';

import { useDispatch } from 'react-redux';
import { updateToggleCartOverlay } from 'Store/Cart/CartReducer.reducer';
import { addProductToCart } from 'Util/Cart';

import { ADD_TO_CART } from './AddToCart.config';

export default function AddToCart(props) {
  const dispatch = useDispatch();
  const {
    product
  } = props;

  return (
    <div
      className='AddToCart'
      onClick={ () => addProduct(product, dispatch) }
    >
      <p>{ ADD_TO_CART }</p>
    </div>
  );
};

function addProduct(product, dispatch) {
  addProductToCart(product, 1, dispatch);
  dispatch(updateToggleCartOverlay(true));
};
