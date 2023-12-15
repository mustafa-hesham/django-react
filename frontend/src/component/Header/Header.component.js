import { PureComponent } from 'react';
import React from 'react';
import './Header.style.scss';
import Account from 'Component/Account';

class HeaderComponent extends PureComponent {
  render() {
    return (
      <div className='Header'>
        <div className='Header-Left'>
        </div>
        <div className='Header-Right'>
          <Account />
        </div>
      </div>
    );
  }
}

export default HeaderComponent;
