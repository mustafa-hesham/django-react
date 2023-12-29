import './Account.style.scss';

import AccountOverlay from 'Component/AccountOverlay';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import { logOut } from 'Util/Customer';

import {
  LOGIN
} from './Account.config';

export default function Account() {
  const accountRef = useRef(null);
  const dispatch = useDispatch();
  const isOverlayToggled = useSelector((state) => state.AccountOverlayReducer.isAccountOverlayToggled);
  const customerName= useSelector((state) => state.CustomerReducer.customer.username);

  return (
    <div className='Account'>
      <p
        className='Account-Text'
        onClick={ () => dispatch(updateToggleAccountOverlay(!isOverlayToggled)) }
        role='Button'
        ref={ accountRef }
      >
        { customerName ? customerName : LOGIN }
      </p>
      { renderLogOut() }
      <AccountOverlay
        isOverlayToggled={ isOverlayToggled }
        accountRef ={ accountRef }
      />
    </div>
  );
};

function renderLogOut() {
  const customerName= useSelector((state) => state.CustomerReducer.customer.username);

  if (!customerName) {
    return null;
  }

  return (
    <div
      className='Account-Logout'
    >
      <p
        role='Button'
        onClick={ logoutCustomer }
      >Logout
      </p>
    </div>
  );
};

function logoutCustomer() {
  logOut();
  location.reload();
};
