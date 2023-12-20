import './AccountLogin.style.scss';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

class AccountLoginComponent extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
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
          />
          <input
            type="password"
            name="password"
            placeholder='Password'
            className='AccountLogin-LoginTextField'
          />
          <input type="submit" value="Login" className='AccountLogin-LoginButton'/>
        </form>
      </div>
    );
  }

  render() {
    return this.renderLogin();
  }
}

export default AccountLoginComponent;
