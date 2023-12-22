import './AccountLogin.style.scss';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

class AccountLoginComponent extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    customerName: PropTypes.string.isRequired
  };

  renderLogin() {
    const {
      handleSubmit
    } = this.props;

    return (
      <div className='AccountLogin'>
        <form className='AccountLogin-LoginForm' onSubmit={ handleSubmit }>
          <input
            type="text"
            name="username"
            placeholder='Username'
            className='AccountLogin-LoginTextField'
            required
          />
          <input
            type="password"
            name="password"
            placeholder='Password'
            className='AccountLogin-LoginTextField'
            required
          />
          <input type="submit" value="Login" className='AccountLogin-LoginButton'/>
        </form>
      </div>
    );
  }

  render() {
    const {
      customerName
    } = this.props;

    if (customerName) {
      return null;
    }

    return this.renderLogin();
  }
}

export default AccountLoginComponent;
