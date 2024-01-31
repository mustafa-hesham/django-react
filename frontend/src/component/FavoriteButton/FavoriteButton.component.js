import './FavoriteButton.style.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteButtonIcon from 'Style/icons/Favorite/favorite_1.png';
import { addOrRemoveGuestFavorite, isFavorite } from 'Util/Favorites';

export default function FavoriteButton(props) {
  const {
    product
  } = props;

  const [isProductFavorite, setIsProductFavorite] = useState(false);
  const customerFavorites = useSelector((state) => state.CustomerReducer.customer.favorites);
  const customerEmail = useSelector((state) => state.CustomerReducer.customer.email);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsProductFavorite(isFavorite(product));
  }, [customerFavorites]);

  const iconClassName = isProductFavorite ?
  'FavoriteButton-Icon FavoriteButton-Icon_IsFavorite' :
  'FavoriteButton-Icon';

  const toolTipContent = isProductFavorite ? 'Remove from favorites' : 'Add to favorites';

  return (
    <div
      className='FavoriteButton'
      data-tooltip-id="my-tooltip"
      data-tooltip-content={ toolTipContent }
      data-tooltip-place="top"
      data-tooltip-variant="info"
      data-tooltip-hidden={ false }
      onClick={ () => addOrRemoveProductGuestFavorite(product, setIsProductFavorite, customerEmail, dispatch) }
    >
      <img src={ FavoriteButtonIcon } className={ iconClassName }/>
    </div>
  );
};

function addOrRemoveProductGuestFavorite(product, setIsProductFavorite, customerEmail, dispatch) {
  addOrRemoveGuestFavorite(product, customerEmail, dispatch);
  setIsProductFavorite(isFavorite(product));
};
