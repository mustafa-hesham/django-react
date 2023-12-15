import './AccountOverlay.style.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

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
