import './AccountOverlay.style.scss';

import {
  CREATE_ACCOUNT,
  LOGIN } from 'Component/Account/Account.config';
import AccountLogin from 'Component/AccountLogin';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { RefType } from 'Type/Common.type';

class AccountOverlayComponent extends PureComponent {
  static propTypes = {
    isOverlayToggled: PropTypes.bool.isRequired,
    overlayRef: RefType.isRequired
  };

  renderTitle() {
    return (
      <div className='AccountOverlay-Title'>
        <h2>{ LOGIN }</h2>
        <h2>{ CREATE_ACCOUNT }</h2>
      </div>
    );
  }

  renderLogin() {
    return (
      <div className='AccountOverlay-Login'>
        <AccountLogin />
      </div>
    );
  }

  render() {
    const {
      isOverlayToggled,
      overlayRef
    } = this.props;

    const className = isOverlayToggled ? 'AccountOverlay AccountOverlay_Clicked' : 'AccountOverlay';

    return (
      <div
        className={ className }
        ref={ overlayRef }
      >
        { this.renderTitle() }
        { this.renderLogin() }
      </div>
    );
  }
}

export default AccountOverlayComponent;
