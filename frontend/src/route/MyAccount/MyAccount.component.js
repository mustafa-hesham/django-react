import './MyAccount.style.scss';

import Header from 'Component/Header';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const renderMap = [
  'Personal', 'Addresses', 'Orders'
];

export default function MyAccount() {
  const customerName= useSelector((state) => state.CustomerReducer.customer.firstName);
  const navigate = useNavigate();

  if (!customerName) {
    useEffect(() => navigate('/'), [customerName]);
  }

  return (
    <div className='MyAccount'>
      <Header />
      <div className='MyAccount-TabsContent'>
        { renderTabsHeaders(renderMap) }
      </div>
    </div>
  );
}

function renderTabsHeaders(tabs) {
  if (!Array.isArray(tabs)) {
    return null;
  }

  return (
    <div className='MyAccount-Tabs'>
      { tabs.map(renderTab) }
    </div>
  );
};

function renderTab(tabName) {
  return (
    <div className='MyAccount-Tab'>
      { tabName }
    </div>
  );
};
