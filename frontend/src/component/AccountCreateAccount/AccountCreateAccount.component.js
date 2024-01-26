import './AccountCreateAccount.style.scss';

import FormDatePicker from 'Component/FormDatePicker';
import { useState } from 'react';

export default function AccountCreateAccount() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className='AccountCreateAccount'>
      <form
        className='AccountCreateAccount-CreateAccountForm OverlayForm'
        onSubmit={ (e) => handleCreateAccount(e) }
      >
        <input
          type="email"
          name="email"
          placeholder='Email'
          className='AccountCreateAccount-TextField OverlayForm-TextField'
          required
        />
        <input
          type="password"
          name="password"
          placeholder='Password'
          className='AccountCreateAccount-TextField OverlayForm-TextField'
          required
        />
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
        />
      </form>
    </div>
  );
};

async function handleCreateAccount(event) {
  event.preventDefault();
  const {
    target: {
      email: {
        value: emailValue
      },
      password: {
        value: passwordValue
      },
      DatePicker: {
        value: datePickerValue
      }
    }
  } = event;

  console.log(emailValue, passwordValue, datePickerValue);
};
