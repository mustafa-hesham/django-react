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
    customerName: PropTypes.string.isRequired
  };

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
          { customerName ? `Welcome, ${customerName}` : LOGIN }
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
