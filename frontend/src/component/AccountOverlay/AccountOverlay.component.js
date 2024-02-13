import './AccountOverlay.style.scss';

import {
  CREATE_ACCOUNT,
  LOGIN, LOGOUT } from 'Component/Account/Account.config';
import AccountCreateAccount from 'Component/AccountCreateAccount';
import AccountLogin from 'Component/AccountLogin';
import Overlay from 'Component/Overlay';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import { logOut, navigateTo } from 'Util/Customer';

import { ADDRESSES, MY_ACCOUNT, ORDERS, PERSONAL } from './AccountOverlay.config';

export default function AccountOverlay(props) {
  const { accountRef, isOverlayToggled } = props;
  const [toggledTab, setToggledTab] = useState(0);
  const customerName = useSelector((state) => state.CustomerReducer.customer.firstName);
  const navigate = useNavigate();

  return (
    <Overlay
      buttonRef = { accountRef }
      isOverlayToggled = { isOverlayToggled }
      toggleFunction = { updateToggleAccountOverlay }
      header = { () => renderTitle(setToggledTab, toggledTab, customerName, navigate) }
      body = { () => renderLogin(toggledTab, customerName) }
    />
  );
};

function renderTitle(setToggledTab, toggledTab, customerName, navigate) {
  if (!!customerName) {
    return renderAccountOptions(customerName, navigate);
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

function renderAccountOptions(customerName, navigate) {
  return (
    <div className='AccountOverlay-Account'>
      <div className='AccountOverlay-Name'>{ `Hello, ${customerName}` }</div>
      <div className='AccountOverlay-MyAccountPanel'>
        <div className='AccountOverlay-MyAccount'>{ MY_ACCOUNT }</div>
        <div
          onClick={ () => navigateTo(navigate, PERSONAL) }
          className='AccountOverlay-MyAccountItem'>
          { PERSONAL }
        </div>
        <div
          onClick={ () => navigateTo(navigate, ADDRESSES) }
          className='AccountOverlay-MyAccountItem'>
          { ADDRESSES }
        </div>
        <div
          onClick={ () => navigateTo(navigate, ORDERS) }
          className='AccountOverlay-MyAccountItem'>
          { ORDERS }
        </div>
        <div onClick={ () => logOut() } className='AccountOverlay-MyAccountItem'>{ LOGOUT }</div>
      </div>
    </div>
  );
};
