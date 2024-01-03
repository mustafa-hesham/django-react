import './QuantityChanger.style.scss';

import MinusIcon from 'Style/icons/Quantity/minus-icon.png';
import PlusIcon from 'Style/icons/Quantity/plus-icon.png';

export default function QuantityChanger(props) {
  const {
    addProduct,
    dispatch,
    product,
    product: {
      quantity
    }
  } = props;

  return (
    <div className='QuantityChanger'>
      { renderIncreaseQuantity(addProduct, product, dispatch) }
      { quantity }
      { renderDecreaseQuantity(addProduct, product, dispatch) }
    </div>
  );
};

function renderIncreaseQuantity(addProduct, product, dispatch) {
  return (
    <div className='QuantityChanger-Increase'>
      <img
        src={ PlusIcon }
        onClick={ () => increaseQuantity(addProduct, product, dispatch) }
      />
    </div>
  );
};

function renderDecreaseQuantity(addProduct, product, dispatch) {
  return (
    <div className='QuantityChanger-Decrease'>
      <img
        src={ MinusIcon }
        onClick={ () => decreaseQuantity(addProduct, product, dispatch) }
      />
    </div>
  );
};

function increaseQuantity(addProduct, product, dispatch) {
  addProduct(product, 1, dispatch);
};

function decreaseQuantity(addProduct, product, dispatch) {
  const {
    quantity
  } = product;

  if (quantity === 1) {
    return;
  }

  addProduct(product, -1, dispatch);
};
