import './AccountOverlay.style.scss';

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
        <h2>Login</h2>
        <h2>Create account</h2>
      </div>
    );
  }

  renderLogin() {
    return (
      <div className='AccountOverlay-Login'>
        <form className='AccountOverlay-LoginForm'>
          <input
            type="text"
            name="username"
            placeholder='Username'
            className='AccountOverlay-LoginTextField'
          />
          <input
            type="password"
            name="password"
            placeholder='Password'
            className='AccountOverlay-LoginTextField'
          />
          <input type="submit" value="Login" className='AccountOverlay-LoginButton'/>
        </form>
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
