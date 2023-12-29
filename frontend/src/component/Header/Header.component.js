import './Header.style.scss';

import Account from 'Component/Account';
import CategoryList from 'Component/CategoryList';

export default function Header() {
  return (
    <div className='Header'>
      <div className='Header-Left'>
        <CategoryList />
      </div>
      <div className='Header-Right'>
        <Account />
      </div>
    </div>
  );
};
