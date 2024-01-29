import './FavoriteButton.style.scss';

import FavoriteButtonIcon from 'Style/icons/Favorite/favorite_1.png';

export default function FavoriteButton(props) {
  return (
    <div className='FavoriteButton'>
      <img src={ FavoriteButtonIcon } className='FavoriteButton-Icon'/>
    </div>
  );
}
