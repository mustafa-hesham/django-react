import './MyAccount.style.scss';

import { ADDRESSES, ORDERS, PERSONAL_INFORMATION } from 'Component/AccountOverlay/AccountOverlay.config';
import Header from 'Component/Header';
import MyAccountPersonal from 'Component/MyAccountPersonal';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { navigateTo } from 'Util/Customer';

const renderMap = [
  {
    title: PERSONAL_INFORMATION,
    component: <MyAccountPersonal />
  },
  {
    title: ADDRESSES,
    component: <></>
  },
  {
    title: ORDERS,
    component: <></>
  }
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

  const {
    component: activeTabComponent
  } = renderMap.find((tab) => tab.title.replace(' ', '_').toLowerCase() === activeTab);

  return (
    <div className='MyAccount'>
      <Header />
      <div className='MyAccount-TabsContent'>
        { renderTabsHeaders(renderMap, navigate, activeTab) }
        <div className='MyAccount-TabComponent'>
          { activeTabComponent }
        </div>
      </div>
    </div>
  );
};

function renderTabsHeaders(tabs, navigate, activeTab) {
  if (!Array.isArray(tabs)) {
    return null;
  }

  return (
    <div className='MyAccount-Tabs'>
      { tabs.map((tab) => renderTab(tab, navigate, activeTab)) }
    </div>
  );
};

function renderTab(tab, navigate, activeTab) {
  const {
    title
  } = tab;

  const className = title.replace(' ', '_').toLowerCase() === activeTab.toLowerCase() ?
    'MyAccount-Tab MyAccount-Tab_Active' :
    'MyAccount-Tab';

  return (
    <div
      key={ title }
      className={ className }
      onClick={ () => navigateTo(navigate, title) }
    >
      { title }
    </div>
  );
};
