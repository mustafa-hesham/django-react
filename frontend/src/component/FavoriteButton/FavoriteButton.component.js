import './FavoriteButton.style.scss';

import FavoriteButtonIcon from 'Style/icons/Favorite/favorite_1.png';

export default function FavoriteButton(props) {
  return (
    <div
      className='FavoriteButton'
      data-tooltip-id="my-tooltip"
      data-tooltip-content="Add to favorites"
      data-tooltip-place="top"
      data-tooltip-variant="info"
      data-tooltip-hidden={ false }
    >
      <img src={ FavoriteButtonIcon } className='FavoriteButton-Icon'/>
    </div>
  );
}
