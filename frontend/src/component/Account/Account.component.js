import './Account.style.scss';

import AccountOverlay from 'Component/AccountOverlay';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';

import {
  LOGIN
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
      <AccountOverlay
        isOverlayToggled={ isOverlayToggled }
        accountRef ={ accountRef }
      />
    </div>
  );
};
