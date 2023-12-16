import PropTypes from 'prop-types';
import React, { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlay.reducer';
import { getAllProducts } from 'Util/Request';

import AccountComponent from './Account.component';

export const mapDispatchToProps = (dispatch) => ({
  toggleAccountOverlay: (isOverlayToggled) => dispatch(updateToggleAccountOverlay(isOverlayToggled)),
});

export const mapStateToProps = (state) => ({
  isOverlayToggled: state.AccountOverlayReducer.isAccountOverlayToggled,
});

class AccountContainer extends PureComponent {
  static propTypes = {
    toggleAccountOverlay: PropTypes.func.isRequired,
    isOverlayToggled: PropTypes.bool.isRequired,
  };

  containerFunctions = {
    toggleOverlay: this.toggleOverlay.bind(this),
  };

  ref = createRef();

  toggleOverlay() {
    const {
      toggleAccountOverlay,
      isOverlayToggled,
    } = this.props;
    toggleAccountOverlay(!isOverlayToggled);
    console.log('HHH', getAllProducts());
  }

  containerProps() {
    const {
      isOverlayToggled,
    } = this.props;

    return {
      isOverlayToggled,
      accountRef: this.ref,
    };
  }

  render() {
    return (
      <AccountComponent
        { ...this.containerProps() }
        { ...this.containerFunctions }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
