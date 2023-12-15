import React from 'react';
import './Account.style.scss';
import { PureComponent } from 'react';
import AccountOverlay from 'Component/AccountOverlay';

class AccountComponent extends PureComponent {
  render() {
    return (
      <div className='Account'>
        <p className='Account-Text'>Account</p>
        <AccountOverlay />
      </div>
    );
  }
}

export default AccountComponent;
