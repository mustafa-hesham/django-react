import './AccountLogin.style.scss';

import { getAuthToken } from 'Query/Token.query';
import { useDispatch, useSelector } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import { customerSignIn } from 'Store/Customer/CustomerReducer.reducer';
import { setCustomerData, signInProcedure } from 'Util/Customer';
import { refreshAuthTokensTimeout, setAuthTokens } from 'Util/Token';

export default function AccountLogin() {
  const customerName = useSelector((state) => state.CustomerReducer.customer.email);

  if (customerName) {
    return null;
  }

  const dispatch = useDispatch();

  return (
    <div className='AccountLogin'>
      <form className='AccountLogin-LoginForm OverlayForm' onSubmit={ (e) => handleSubmit(e, dispatch) }>
        <input
          type="text"
          name="email"
          placeholder='Email'
          className='AccountLogin-LoginTextField OverlayForm-TextField'
          required
        />
        <input
          type="password"
          name="password"
          placeholder='Password'
          className='AccountLogin-LoginTextField OverlayForm-TextField'
          required
        />
        <input type="submit" value="Login" className='AccountLogin-LoginButton OverlayForm-SubmitButton'/>
      </form>
    </div>
  );
};

async function handleSubmit(event, dispatch) {
  event.preventDefault();

  const {
    target: {
      email: {
        value: emailValue
      },
      password: {
        value: passwordValue
      }
    }
  } = event;

  const {
    tokenAuth: {
      token = '',
      refreshToken = '',
      payload: {
        email = ''
      } = {},
      user: {
        firstName = '',
        lastName = ''
      } = {}
    } = {}
  } = await getAuthToken(emailValue, passwordValue);

  if (token) {
    setAuthTokens(token, refreshToken);
    dispatch(updateToggleAccountOverlay(false));
    dispatch(customerSignIn({ email: email, firstName: firstName, lastName: lastName }));
    setCustomerData({ email: email, firstName: firstName, lastName: lastName });
    signInProcedure(dispatch);
    refreshAuthTokensTimeout();
  }
};
