import './FavoritesHeader.style.scss';

import { useNavigate } from 'react-router-dom';

import { FAVORITES } from './FavoritesHeader.config';

export default function Favorites() {
  const navigate = useNavigate();

  return (
    <div
      className='FavoritesHeader Header-Text'
      onClick={ () => navigate('/favorites') }
    >
      { FAVORITES }
    </div>
  );
}
