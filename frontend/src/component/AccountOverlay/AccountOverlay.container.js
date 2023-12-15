import React from 'react';
import { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import AccountOverlayComponent from './AccountOverlay.component';
import PropTypes from 'prop-types';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlay.reducer';

export const mapDispatchToProps = (dispatch) => ({
  toggleAccountOverlay: (isOverlayToggled) => dispatch(updateToggleAccountOverlay(isOverlayToggled)),
});

export const mapStateToProps = (state) => ({
  isOverlayToggled: state.AccountOverlayReducer?.isAccountOverlayToggled,
});

class AccountOverlayContainer extends PureComponent {
  static propTypes = {
    isOverlayToggled: PropTypes.bool.isRequired,
    toggleAccountOverlay: PropTypes.func.isRequired,
    accountRef: PropTypes.any.isRequired,
  };

  state = {
    isOverlayClicked: false,
  };

  containerFunctions = {
    handleClickOutside: this.handleClickOutside.bind(this),
  };

  ref = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', (e) => this.handleClickOutside(e));
  }

  handleClickOutside(e) {
    const {
      isOverlayToggled,
      toggleAccountOverlay,
      accountRef,
    } = this.props;

    const {
      current,
    } = this.ref;

    const {
      target,
    } = e;

    if (current && !current.contains(target) && isOverlayToggled && !accountRef.current.contains(target)) {
      toggleAccountOverlay(!isOverlayToggled);
    }
  }

  containerProps() {
    const {
      isOverlayToggled,
    } = this.props;

    const overlayRef = this.ref;

    return {
      isOverlayToggled,
      overlayRef,
    };
  }

  render() {
    return (
      <AccountOverlayComponent
        { ...this.containerProps() }
        {...this.containerFunctions }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountOverlayContainer);
