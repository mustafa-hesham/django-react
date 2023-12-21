import PropTypes from 'prop-types';
import { getAuthToken } from 'Query/Token.query';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import { customerSignIn } from 'Store/Customer/CustomerReducer.reducer';
import { setAuthTokens } from 'Util/Token';

import AccountLoginComponent from './AccountLogin.component';

export const mapDispatchToProps = (dispatch) => ({
  customerSignIn: (customer)=> dispatch(customerSignIn(customer)),
  toggleAccountOverlay: (isOverlayToggled) => dispatch(updateToggleAccountOverlay(isOverlayToggled))
});

export const mapStateToProps = (state) => ({
  customerName: state.CustomerReducer.customer.username
});

class AccountLoginContainer extends PureComponent {
  static propTypes = {
    customerSignIn: PropTypes.func.isRequired,
    toggleAccountOverlay: PropTypes.func.isRequired,
    customerName: PropTypes.string.isRequired
  };

  containerFunctions = {
    handleSubmit: this.handleSubmit.bind(this)
  };

  async handleSubmit(event) {
    const {
      customerSignIn,
      toggleAccountOverlay
    } = this.props;

    event.preventDefault();

    const {
      target: {
        username: {
          value: usernameValue
        },
        password: {
          value: passwordValue
        }
      }
    } = event;

    const {
      tokenAuth: {
        token,
        refreshToken,
        payload: {
          username
        }
      }
    } = await getAuthToken(usernameValue, passwordValue);

    setAuthTokens(token, refreshToken);
    toggleAccountOverlay(false);
    customerSignIn({ username: username });
  }

  containerProps() {
    const {
      customerName
    } = this.props;

    return {
      customerName
    };
  }

  render() {
    return (
      <AccountLoginComponent
        { ...this.containerProps() }
        { ...this.containerFunctions }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountLoginContainer);
