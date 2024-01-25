import './AccountCreateAccount.style.scss';
import 'react-datepicker/dist/react-datepicker.css';

import { useState } from 'react';
import DatePicker from 'react-datepicker';

export default function AccountCreateAccount() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className='AccountCreateAccount'>
      <form className='AccountCreateAccount-CreateAccountForm'>
        <input
          type="email"
          name="email"
          placeholder='Email'
          className='AccountCreateAccount-TextField'
          required
        />
        <input
          type="password"
          name="password"
          placeholder='Password'
          className='AccountCreateAccount-TextField'
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder='First name'
          className='AccountCreateAccount-TextField'
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder='Last name'
          className='AccountCreateAccount-TextField'
          required
        />
        <DatePicker selected={ startDate } onChange={ (date) => setStartDate(date) } />
        <input type="submit" value="Create Account" className='AccountCreateAccount-CreateAccountButton'/>
      </form>
    </div>
  );
};
