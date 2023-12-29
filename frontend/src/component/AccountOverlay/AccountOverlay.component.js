import './AccountOverlay.style.scss';

import {
  CREATE_ACCOUNT,
  LOGIN } from 'Component/Account/Account.config';
import AccountLogin from 'Component/AccountLogin';
import Overlay from 'Component/Overlay';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';

export default function AccountOverlay(props) {
  const { accountRef, isOverlayToggled } = props;

  return (
    <Overlay
      buttonRef = { accountRef }
      isOverlayToggled = { isOverlayToggled }
      toggleFunction = { updateToggleAccountOverlay }
      header = { renderTitle }
      body = { renderLogin }
    />
  );
};

function renderTitle() {
  return (
    <div className='AccountOverlay-Title'>
      <h2>{ LOGIN }</h2>
      <h2>{ CREATE_ACCOUNT }</h2>
    </div>
  );
};

function renderLogin() {
  return (
    <div className='AccountOverlay-Login'>
      <AccountLogin />
    </div>
  );
};
