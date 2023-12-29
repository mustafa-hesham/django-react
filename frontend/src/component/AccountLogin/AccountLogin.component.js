import './AccountLogin.style.scss';

import { getAuthToken } from 'Query/Token.query';
import { useDispatch, useSelector } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import { customerSignIn } from 'Store/Customer/CustomerReducer.reducer';
import { setCustomerData } from 'Util/Customer';
import { setAuthTokens } from 'Util/Token';

export default function AccountLogin() {
  const customerName = useSelector((state) => state.CustomerReducer.customer.username);

  if (customerName) {
    return null;
  }

  const dispatch = useDispatch();

  return (
    <div className='AccountLogin'>
      <form className='AccountLogin-LoginForm' onSubmit={ (e) => handleSubmit(e, dispatch) }>
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
};

async function handleSubmit(event, dispatch) {
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
  dispatch(updateToggleAccountOverlay(false));
  dispatch(customerSignIn({ username: username }));
  setCustomerData({ username: username });
};
