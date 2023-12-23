import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import { logOut } from 'Util/Customer';

import AccountComponent from './Account.component';

export const mapDispatchToProps = (dispatch) => ({
  toggleAccountOverlay: (isOverlayToggled) => dispatch(updateToggleAccountOverlay(isOverlayToggled))
});

export const mapStateToProps = (state) => ({
  isOverlayToggled: state.AccountOverlayReducer.isAccountOverlayToggled,
  customerName: state.CustomerReducer.customer.username
});

class AccountContainer extends PureComponent {
  static propTypes = {
    toggleAccountOverlay: PropTypes.func.isRequired,
    isOverlayToggled: PropTypes.bool.isRequired,
    customerName: PropTypes.string.isRequired
  };

  containerFunctions = {
    toggleOverlay: this.toggleOverlay.bind(this),
    logoutCustomer: this.logoutCustomer.bind(this)
  };

  ref = createRef();

  toggleOverlay() {
    const {
      toggleAccountOverlay,
      isOverlayToggled
    } = this.props;

    toggleAccountOverlay(!isOverlayToggled);
  }

  logoutCustomer() {
    logOut();
    location.reload();
  }

  containerProps() {
    const {
      isOverlayToggled,
      customerName
    } = this.props;

    return {
      isOverlayToggled,
      customerName,
      accountRef: this.ref
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
