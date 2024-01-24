import './AccountOverlay.style.scss';

import {
  CREATE_ACCOUNT,
  LOGIN } from 'Component/Account/Account.config';
import AccountLogin from 'Component/AccountLogin';
import Overlay from 'Component/Overlay';
import { useState } from 'react';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';

export default function AccountOverlay(props) {
  const { accountRef, isOverlayToggled } = props;
  const [toggledTab, setToggledTab] = useState(0);

  return (
    <Overlay
      buttonRef = { accountRef }
      isOverlayToggled = { isOverlayToggled }
      toggleFunction = { updateToggleAccountOverlay }
      header = { () => renderTitle(setToggledTab) }
      body = { () => renderLogin(toggledTab) }
    />
  );
};

function renderTitle(setToggledTab) {
  return (
    <div className='AccountOverlay-Title'>
      <div
        className='AccountOverlay-LoginTitle'
        onClick={ () => setToggledTab(0) }
      >
        { LOGIN }
      </div>
      <div
        className='AccountOverlay-CreateAccountTitle'
        onClick={ () => setToggledTab(1) }
      >
        { CREATE_ACCOUNT }
      </div>
    </div>
  );
};

function renderLogin(toggledTab) {
  if (toggledTab) {
    return null;
  }

  return (
    <div className='AccountOverlay-Login'>
      <AccountLogin />
    </div>
  );
};
