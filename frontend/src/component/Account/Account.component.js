import './Account.style.scss';

import AccountOverlay from 'Component/AccountOverlay';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import { logOut } from 'Util/Customer';

import {
  LOGIN,
  LOGOUT
} from './Account.config';

export default function Account() {
  const accountRef = useRef(null);
  const dispatch = useDispatch();
  const isOverlayToggled = useSelector((state) => state.AccountOverlayReducer.isAccountOverlayToggled);
  const customerName= useSelector((state) => state.CustomerReducer.customer.firstName);

  return (
    <div className='Account'>
      <div
        className='Account-Text Header-Text'
        onClick={ () => dispatch(updateToggleAccountOverlay(!isOverlayToggled)) }
        role='Button'
        ref={ accountRef }
      >
        { customerName ? customerName : LOGIN }
      </div>
      { renderLogOut() }
      <AccountOverlay
        isOverlayToggled={ isOverlayToggled }
        accountRef ={ accountRef }
      />
    </div>
  );
};

function renderLogOut() {
  const customerName= useSelector((state) => state.CustomerReducer.customer.email);

  if (!customerName) {
    return null;
  }

  return (
    <div
      className='Account-Logout Header-Text'
    >
      <div
        role='Button'
        onClick={ logoutCustomer }
      > { LOGOUT }
      </div>
    </div>
  );
};

function logoutCustomer() {
  logOut();
  location.reload();
};
