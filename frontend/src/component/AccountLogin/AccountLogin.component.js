import './AccountLogin.style.scss';

import PasswordField from 'Component/PasswordField';
import { getAuthToken } from 'Query/Token.query';
import { useDispatch, useSelector } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import { updateCustomerState } from 'Store/Customer/CustomerReducer.reducer';
import { setCustomerData, signInProcedure } from 'Util/Customer';
import { showNotificationMessage } from 'Util/ShowNotification';
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
        <div className='AccountCreateAccount-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <div className='OverlayForm-Label OverlayForm-Label_Required'>Email</div>
          <input
            type="text"
            name="email"
            placeholder='Email'
            className='AccountLogin-LoginTextField OverlayForm-TextField'
            required
          />
        </div>
        <div className='AccountCreateAccount-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <PasswordField />
        </div>
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
        lastName = '',
        birthDate = '1971-01-01',
        id
      } = {}
    } = {},
    message: errorMessage
  } = await getAuthToken(emailValue, passwordValue);

  if (token && !errorMessage) {
    setAuthTokens(token, refreshToken);
    dispatch(updateToggleAccountOverlay(false));
    dispatch(
        updateCustomerState({ email: email, firstName: firstName, lastName: lastName, birthDate: birthDate, id: id })
    );
    setCustomerData({ email: email, firstName: firstName, lastName: lastName, birthDate: birthDate, id: id });
    signInProcedure(dispatch);
    refreshAuthTokensTimeout();
  } else {
    showNotificationMessage('error', errorMessage);
  }
};
