import './AccountCreateAccount.style.scss';

import FormDatePicker from 'Component/FormDatePicker';
import { createNewCustomer } from 'Query/Account.query';
import { useState } from 'react';

export default function AccountCreateAccount() {
  const [startDate, setStartDate] = useState(new Date());
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [input, setInput] = useState({
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState({
    email: '',
    password: '',
    password2: ''
  });

  return (
    <div className='AccountCreateAccount'>
      <form
        className='AccountCreateAccount-CreateAccountForm OverlayForm'
        onSubmit={ (e) => handleCreateAccount(e, isFormSubmitted, error) }
      >
        <div className='AccountCreateAccount-TextFieldWrapper OverlayForm-TextFieldWrapper'>
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
        <input
          type="text"
          name="firstName"
          placeholder='First name'
          className='AccountCreateAccount-TextField OverlayForm-TextField'
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder='Last name'
          className='AccountCreateAccount-TextField OverlayForm-TextField'
          required
        />
        <FormDatePicker
          startDate = { startDate }
          setStartDate = { setStartDate }
        />
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

async function handleCreateAccount(event, isFormSubmitted, error) {
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

  console.log(typeof datePickerValue);
  if (isFormSubmitted && !!Object.values(error).find((value) => !!value)) {
    return;
  }

  const {
    customer
  } = await createNewCustomer(
      emailValue,
      firstNameValue,
      lastNameValue,
      passwordValue,
      password2Value,
      datePickerValue
  );

  console.log(customer);
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
