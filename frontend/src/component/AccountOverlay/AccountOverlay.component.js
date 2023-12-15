import React from 'react';
import './AccountOverlay.style.scss';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AccountOverlayComponent extends PureComponent {
  static propTypes = {
    isOverlayToggled: PropTypes.bool.isRequired,
    overlayRef: PropTypes.any.isRequired,
  };

  render() {
    const {
      isOverlayToggled,
      overlayRef,
    } = this.props;

    const className = isOverlayToggled ? 'AccountOverlay AccountOverlay_Clicked' : 'AccountOverlay';

    return (
      <div
        className={ className }
        ref={ overlayRef }
      >
      </div>
    );
  }
}

export default AccountOverlayComponent;
