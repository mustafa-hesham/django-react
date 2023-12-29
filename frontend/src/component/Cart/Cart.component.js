import './Cart.style.scss';

import CartIcon from 'Style/icons/Cart/cart-icon-60.png';

export default function Cart() {
  return (
    <div className='Cart'>
      <img className='Cart-CartIcon' src={ CartIcon } />
    </div>
  );
}
