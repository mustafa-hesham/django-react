import { PureComponent } from 'react';
import { connect } from 'react-redux';

import AccountLoginComponent from './AccountLogin.component';

export const mapDispatchToProps = () => ({});

export const mapStateToProps = () => ({});

class AccountLoginContainer extends PureComponent {
  containerFunctions = {
    handleSubmit: this.handleSubmit.bind(this)
  };

  handleSubmit(event) {
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

    console.log(usernameValue, passwordValue);
  }

  containerProps() {}

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
