import './MyAccountPersonal.style.scss';

import { PERSONAL } from 'Component/AccountOverlay/AccountOverlay.config';
import FormDatePicker from 'Component/FormDatePicker';
import Modal from 'Component/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import EditIcon from 'Style/icons/Edit/edit.png';

export default function MyAccountPersonal() {
  const customer = useSelector((state) => state.CustomerReducer.customer);
  const [isDisplayModal, setIsDisplayModal] = useState(false);

  return (
    <div className='MyAccountPersonal'>
      <div className='MyAccountPersonal-EditIconWrapper'>
        <img
          className='MyAccountPersonal-EditIcon'
          src={ EditIcon }
          onClick={ () => setIsDisplayModal(!isDisplayModal) }
        />
      </div>
      <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
        <div className='OverlayForm-Label'>Email</div>
        <input
          type="text"
          name="email"
          placeholder='Email'
          className='MyAccountPersonal-TextField OverlayForm-TextField'
          value={ customer.email }
          required
          disabled
        />
      </div>
      <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
        <div className='OverlayForm-Label'>First name</div>
        <input
          type="text"
          name="firstName"
          placeholder='First name'
          className='MyAccountPersonal-TextField OverlayForm-TextField'
          value={ customer.firstName }
          required
          disabled
        />
      </div>
      <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
        <div className='OverlayForm-Label'>Last name</div>
        <input
          type="text"
          name="lastName"
          placeholder='Last name'
          className='MyAccountPersonal-TextField OverlayForm-TextField'
          value={ customer.lastName }
          required
          disabled
        />
      </div>
      <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
        <div className='OverlayForm-Label'>Birthday</div>
        <FormDatePicker
          currentDate = { new Date('1971-01-01') }
        />
      </div>
      { <Modal
        header = { () => modalHeader() }
        body={ () => editPersonalInfo(customer) }
        isDisplayModal={ isDisplayModal }
        setIsDisplayModal={ setIsDisplayModal }
      /> }
    </div>
  );
};

function modalHeader() {
  return (
    <div
      className='MyAccountPersonal-ModalHeader'
    >
      { `Edit ${PERSONAL.toLowerCase()}` }
    </div>
  );
}

function editPersonalInfo(customer) {
  return (
    <div
      className='MyAccountPersonal-Modal'
    >
      <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
        <div className='OverlayForm-Label'>Email</div>
        <input
          type="text"
          name="email"
          placeholder='Email'
          className='MyAccountPersonal-TextField OverlayForm-TextField'
          value={ customer.email }
          required
        />
      </div>
      <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
        <div className='OverlayForm-Label'>First name</div>
        <input
          type="text"
          name="firstName"
          placeholder='First name'
          className='MyAccountPersonal-TextField OverlayForm-TextField'
          value={ customer.firstName }
          required
        />
      </div>
      <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
        <div className='OverlayForm-Label'>Last name</div>
        <input
          type="text"
          name="lastName"
          placeholder='Last name'
          className='MyAccountPersonal-TextField OverlayForm-TextField'
          value={ customer.lastName }
          required
        />
      </div>
      <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
        <div className='OverlayForm-Label'>Birthday</div>
        <FormDatePicker
          currentDate = { new Date('1971-01-01') }
        />
      </div>
    </div>
  );
};
