import './AccountCreateAccount.style.scss';

import FormDatePicker from 'Component/FormDatePicker';
import { createNewCustomer } from 'Query/Account.query';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import { showNotificationMessage } from 'Util/ShowNotification';

export default function AccountCreateAccount() {
  const [currentDate, setCurrentDate] = useState(new Date('1971-01-01'));
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [input, setInput] = useState({
    email: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: ''
  });

  const [error, setError] = useState({
    email: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: '',
    birthDate: ''
  });

  const navigate = useNavigate();
  const isOverlayToggled = useSelector((state) => state.AccountOverlayReducer.isAccountOverlayToggled);
  const dispatch = useDispatch();

  return (
    <div className='AccountCreateAccount'>
      <form
        className='AccountCreateAccount-CreateAccountForm OverlayForm'
        onSubmit={ (e) => handleCreateAccount(e, isFormSubmitted, error, navigate, isOverlayToggled, dispatch) }
      >
        <div className='AccountCreateAccount-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <div className='OverlayForm-Label OverlayForm-Label_Required'>Email</div>
          <input
            type="email"
            name="email"
            placeholder='Email'
            value={ input.email }
            onChange={ (e) => onInputChange(e, input, error, setError, setInput) }
            className='AccountCreateAccount-TextField OverlayForm-TextField'
            required
          />
          { isFormSubmitted &&
        error.email && <div className='AccountCreateAccount-Error OverlayForm-Error'>{ error.email }</div> }
        </div>
        <div className='AccountCreateAccount-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <div className='OverlayForm-Label OverlayForm-Label_Required'>Password</div>
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={ input.password }
            onChange={ (e) => onInputChange(e, input, error, setError, setInput) }
            className='AccountCreateAccount-TextField OverlayForm-TextField'
            required
          />
          { isFormSubmitted &&
        error.password && <div className='AccountCreateAccount-Error OverlayForm-Error'>{ error.password }</div> }
        </div>
        <div className='AccountCreateAccount-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <div className='OverlayForm-Label OverlayForm-Label_Required'>Confirm Password</div>
          <input
            type="password"
            name="password2"
            placeholder='Confirm password'
            value={ input.password2 }
            onChange={ (e) => onInputChange(e, input, error, setError, setInput) }
            className='AccountCreateAccount-TextField OverlayForm-TextField'
            required
          />
          { isFormSubmitted &&
        error.password2 && <div className='AccountCreateAccount-Error OverlayForm-Error'>{ error.password2 }</div> }
        </div>
        <div className='AccountCreateAccount-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <div className='OverlayForm-Label OverlayForm-Label_Required'>First name</div>
          <input
            type="text"
            name="firstName"
            placeholder='First name'
            value={ input.firstName }
            onChange={ (e) => onInputChange(e, input, error, setError, setInput) }
            className='AccountCreateAccount-TextField OverlayForm-TextField'
            required
          />
          { isFormSubmitted &&
        error.firstName && <div className='AccountCreateAccount-Error OverlayForm-Error'>{ error.firstName }</div> }
        </div>
        <div className='AccountCreateAccount-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <div className='OverlayForm-Label OverlayForm-Label_Required'>Last name</div>
          <input
            type="text"
            name="lastName"
            placeholder='Last name'
            value={ input.lastName }
            onChange={ (e) => onInputChange(e, input, error, setError, setInput) }
            className='AccountCreateAccount-TextField OverlayForm-TextField'
            required
          />
          { isFormSubmitted &&
        error.lastName && <div className='AccountCreateAccount-Error OverlayForm-Error'>{ error.lastName }</div> }
        </div>
        <div className='AccountCreateAccount-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <div className='OverlayForm-Label'>Birthday</div>
          <FormDatePicker
            currentDate = { currentDate }
            setCurrentDate = { setCurrentDate }
            validationFunction = { () => validateBirthDate(currentDate, setError) }
          />
          { isFormSubmitted &&
        error.birthDate && <div className='AccountCreateAccount-Error OverlayForm-Error'>{ error.birthDate }</div> }
        </div>
        <input
          type="submit"
          value="Create Account"
          className='AccountCreateAccount-CreateAccountButton OverlayForm-SubmitButton'
          onClick={ () => setIsFormSubmitted(true) }
        />
      </form>
    </div>
  );
};

async function handleCreateAccount(event, isFormSubmitted, error, navigate, isOverlayToggled, dispatch) {
  event.preventDefault();
  const {
    target: {
      email: {
        value: emailValue
      },
      password: {
        value: passwordValue
      },
      password2: {
        value: password2Value
      },
      firstName: {
        value: firstNameValue
      },
      lastName: {
        value: lastNameValue
      },
      DatePicker: {
        value: datePickerValue
      }
    }
  } = event;

  if (isFormSubmitted && !!Object.values(error).find((value) => !!value)) {
    return;
  }

  const initialCustomerValues = {
    customer: {
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      birthDate: undefined
    }
  };

  const {
    createCustomer: {
      customer: {
        email,
        firstName,
        lastName,
        birthDate
      }
    } = initialCustomerValues,
    message: errorMessage
  } = await createNewCustomer(
      emailValue,
      firstNameValue,
      lastNameValue,
      passwordValue,
      password2Value,
      datePickerValue
  ) || {};

  if (!errorMessage && email) {
    navigate(`/new_account/${firstName}/${lastName}/${email}/${birthDate}`);

    if (isOverlayToggled) {
      dispatch(updateToggleAccountOverlay(false));
    }
  } else {
    showNotificationMessage('error', errorMessage);
  }
};

function validateInput(e, input, error, setError) {
  const { name, value } = e.target;
  setError((prev) => {
    const stateObj = { ...prev, [name]: '' };

    switch (name) {
      case 'email':
        if (!value) {
          stateObj[name] = 'Please enter email.';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          stateObj[name] = 'Please enter a valid email.';
        }
        break;

      case 'password':
        if (!value) {
          stateObj[name] = 'Please enter Password.';
        } else if (input.password2 && value !== input.password2) {
          stateObj['password2'] = 'Password and confirm password does not match.';
        } else {
          stateObj['password2'] = input.password2 ? '' : error.password2;
        }
        break;

      case 'password2':
        if (!value) {
          stateObj[name] = 'Please enter Confirm Password.';
        } else if (input.password && value !== input.password) {
          stateObj[name] = 'Password and confirm password does not match.';
        }
        break;

      case 'firstName':
        if (!value) {
          stateObj[name] = 'Please enter first name.';
        }
        break;

      case 'lastName':
        if (!value) {
          stateObj[name] = 'Please enter first name.';
        }
        break;

      default:
        break;
    }

    return stateObj;
  });
};

function onInputChange(e, input, error, setError, setInput) {
  const { name, value } = e.target;
  setInput((prev) => ({
    ...prev,
    [name]: value
  }));
  validateInput(e, input, error, setError);
};

function validateBirthDate(currentDate, setError) {
  if (currentDate > new Date()) {
    setError((prev) => ({
      ...prev,
      birthDate: 'Birthday cannot be a future date.'
    }));
  }
};
