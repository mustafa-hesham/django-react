import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlay.reducer';
import { RefType } from 'Type/Common.type';

import AccountOverlayComponent from './AccountOverlay.component';

export const mapDispatchToProps = (dispatch) => ({
  toggleAccountOverlay: (isOverlayToggled) => dispatch(updateToggleAccountOverlay(isOverlayToggled))
});

export const mapStateToProps = (state) => ({
  isOverlayToggled: state.AccountOverlayReducer?.isAccountOverlayToggled
});

class AccountOverlayContainer extends PureComponent {
  static propTypes = {
    isOverlayToggled: PropTypes.bool.isRequired,
    toggleAccountOverlay: PropTypes.func.isRequired,
    accountRef: RefType.isRequired
  };

  containerFunctions = {
    handleClickOutside: this.handleClickOutside.bind(this)
  };

  ref = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', (e) => this.handleClickOutside(e));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', (e) => this.handleClickOutside(e));
  }

  handleClickOutside(e) {
    const {
      isOverlayToggled,
      toggleAccountOverlay,
      accountRef
    } = this.props;

    const {
      current
    } = this.ref;

    const {
      target
    } = e;

    if (current && !current.contains(target) && isOverlayToggled && !accountRef.current.contains(target)) {
      toggleAccountOverlay(!isOverlayToggled);
    }
  }

  containerProps() {
    const {
      isOverlayToggled
    } = this.props;

    const overlayRef = this.ref;

    return {
      isOverlayToggled,
      overlayRef
    };
  }

  render() {
    return (
      <AccountOverlayComponent
        { ...this.containerProps() }
        { ...this.containerFunctions }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountOverlayContainer);
