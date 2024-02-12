import './MyAccount.style.scss';

import Header from 'Component/Header';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { navigateTo } from 'Util/Customer';

const renderMap = [
  'Personal', 'Addresses', 'Orders'
];

export default function MyAccount() {
  const customerName= useSelector((state) => state.CustomerReducer.customer.firstName);
  const navigate = useNavigate();
  const {
    tab: activeTab
  } = useParams();

  if (!customerName) {
    useEffect(() => navigate('/'), [customerName]);
  }

  return (
    <div className='MyAccount'>
      <Header />
      <div className='MyAccount-TabsContent'>
        { renderTabsHeaders(renderMap, navigate, activeTab) }
      </div>
    </div>
  );
}

function renderTabsHeaders(tabs, navigate, activeTab) {
  if (!Array.isArray(tabs)) {
    return null;
  }

  return (
    <div className='MyAccount-Tabs'>
      { tabs.map((tabName) => renderTab(tabName, navigate, activeTab)) }
    </div>
  );
};

function renderTab(tabName, navigate, activeTab) {
  const className = tabName.toLowerCase() === activeTab.toLowerCase() ?
    'MyAccount-Tab MyAccount-Tab_Active' :
    'MyAccount-Tab';

  return (
    <div
      key={ tabName }
      className={ className }
      onClick={ () => navigateTo(navigate, tabName) }
    >
      { tabName }
    </div>
  );
};
