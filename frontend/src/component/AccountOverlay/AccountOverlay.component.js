import './AccountOverlay.style.scss';

import {
  CREATE_ACCOUNT,
  LOGIN, LOGOUT } from 'Component/Account/Account.config';
import AccountCreateAccount from 'Component/AccountCreateAccount';
import AccountLogin from 'Component/AccountLogin';
import Overlay from 'Component/Overlay';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import { logOut } from 'Util/Customer';

import { ADDRESSES, MY_ACCOUNT, ORDERS, PERSONAL } from './AccountOverlay.config';

export default function AccountOverlay(props) {
  const { accountRef, isOverlayToggled } = props;
  const [toggledTab, setToggledTab] = useState(0);
  const customerName = useSelector((state) => state.CustomerReducer.customer.firstName);

  return (
    <Overlay
      buttonRef = { accountRef }
      isOverlayToggled = { isOverlayToggled }
      toggleFunction = { updateToggleAccountOverlay }
      header = { () => renderTitle(setToggledTab, toggledTab, customerName) }
      body = { () => renderLogin(toggledTab, customerName) }
    />
  );
};

function renderTitle(setToggledTab, toggledTab, customerName) {
  if (!!customerName) {
    return renderAccountOptions(customerName);
  }

  const loginTitleClassName = toggledTab === 0 ? 'AccountOverlay-LoginTitle AccountOverlay-LoginTitle_Clicked' :
  'AccountOverlay-LoginTitle';

  const CreateAccountTitleClassName = toggledTab === 1 ?
  'AccountOverlay-CreateAccountTitle AccountOverlay-CreateAccountTitle_Clicked':
  'AccountOverlay-CreateAccountTitle';

  return (
    <div className='AccountOverlay-Title'>
      <div
        className={ loginTitleClassName }
        onClick={ () => setToggledTab(0) }
      >
        { LOGIN }
      </div>
      <div
        className={ CreateAccountTitleClassName }
        onClick={ () => setToggledTab(1) }
      >
        { CREATE_ACCOUNT }
      </div>
    </div>
  );
};

function renderLogin(toggledTab, customerName) {
  if (customerName) {
    return null;
  }

  if (toggledTab) {
    return <AccountCreateAccount />;
  }

  return (
    <div className='AccountOverlay-Login'>
      <AccountLogin />
    </div>
  );
};

function renderAccountOptions(customerName) {
  return (
    <div className='AccountOverlay-Account'>
      <div className='AccountOverlay-Name'>{ `Hello, ${customerName}` }</div>
      <div className='AccountOverlay-MyAccountPanel'>
        <div className='AccountOverlay-MyAccount'>{ MY_ACCOUNT }</div>
        <div className='AccountOverlay-MyAccountItem'>{ PERSONAL }</div>
        <div className='AccountOverlay-MyAccountItem'>{ ADDRESSES }</div>
        <div className='AccountOverlay-MyAccountItem'>{ ORDERS }</div>
        <div onClick={ () => logoutCustomer() } className='AccountOverlay-MyAccountItem'>{ LOGOUT }</div>
      </div>
    </div>
  );
};

function logoutCustomer() {
  logOut();
  location.reload();
};
