import './Account.style.scss';

import AccountOverlay from 'Component/AccountOverlay';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { RefType } from 'Type/Common.type';

import {
  LOGIN
} from './Account.config';

class AccountComponent extends PureComponent {
  static propTypes = {
    toggleOverlay: PropTypes.func.isRequired,
    isOverlayToggled: PropTypes.bool.isRequired,
    accountRef: RefType.isRequired,
    customerName: PropTypes.string.isRequired,
    logoutCustomer: PropTypes.func.isRequired
  };

  renderLogOut() {
    const {
      customerName,
      logoutCustomer
    } = this.props;

    if (!customerName) {
      return null;
    }

    return (
      <div
        className='Account-Logout'
      >
        <p
          role='Button'
          onClick={ logoutCustomer }
        >Logout
        </p>
      </div>
    );
  }

  render() {
    const {
      toggleOverlay,
      isOverlayToggled,
      accountRef,
      customerName
    } = this.props;

    return (
      <div className='Account'>
        <p
          className='Account-Text'
          onClick={ toggleOverlay }
          role='Button'
          ref={ accountRef }
        >
          { customerName ? customerName : LOGIN }
        </p>
        { this.renderLogOut() }
        <AccountOverlay
          isOverlayToggled={ isOverlayToggled }
          accountRef ={ accountRef }
        />
      </div>
    );
  }
}

export default AccountComponent;
