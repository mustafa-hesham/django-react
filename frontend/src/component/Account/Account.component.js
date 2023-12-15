import React from 'react';
import './Account.style.scss';
import { PureComponent } from 'react';
import AccountOverlay from 'Component/AccountOverlay';
import PropTypes from 'prop-types';

class AccountComponent extends PureComponent {
  static propTypes = {
    toggleOverlay: PropTypes.func.isRequired,
    isOverlayToggled: PropTypes.bool.isRequired,
    accountRef: PropTypes.any.isRequired,
  };

  render() {
    const {
      toggleOverlay,
      isOverlayToggled,
      accountRef,
    } = this.props;

    return (
      <div className='Account'>
        <p
          className='Account-Text'
          onClick={ toggleOverlay }
          role='Button'
          ref={ accountRef }
        >
          Account
        </p>
        <AccountOverlay
          isOverlayToggled={ isOverlayToggled }
          accountRef ={ accountRef }
        />
      </div>
    );
  }
}

export default AccountComponent;
