import './MyAccountPersonal.style.scss';

import { PERSONAL_INFORMATION } from 'Component/AccountOverlay/AccountOverlay.config';
import FormDatePicker from 'Component/FormDatePicker';
import Modal from 'Component/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import EditIcon from 'Style/icons/Edit/edit.png';
import { onInputChange, validateBirthDate } from 'Util/General';

export default function MyAccountPersonal() {
  const customer = useSelector((state) => state.CustomerReducer.customer);
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(customer.birthDate || '1971-01-01'));
  const [input, setInput] = useState({
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    birthDate: customer.birthDate
  });

  const [error, setError] = useState({
    email: '',
    firstName: '',
    lastName: '',
    birthDate: ''
  });

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
          currentDate = { new Date(customer.birthDate || '1971-01-01') }
          disabled={ true }
        />
      </div>
      { <Modal
        header = { () => modalHeader() }
        body={ () => editPersonalInfo(
            input,
            error,
            setError,
            setInput,
            isFormSubmitted,
            setIsFormSubmitted,
            currentDate,
            setCurrentDate
        ) }
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
      { `Edit ${PERSONAL_INFORMATION.toLowerCase()}` }
    </div>
  );
}

function editPersonalInfo(
    input,
    error,
    setError,
    setInput,
    isFormSubmitted,
    setIsFormSubmitted,
    currentDate,
    setCurrentDate
) {
  return (
    <div
      className='MyAccountPersonal-Modal'
    >
      <form
        className='MyAccountPersonal-EditForm'
        onSubmit={ (e) => e.preventDefault() }
      >
        <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <div className='OverlayForm-Label'>Email</div>
          <input
            type="text"
            name="email"
            placeholder='Email'
            className='MyAccountPersonal-TextField OverlayForm-TextField'
            value={ input.email }
            onChange={ (e) => onInputChange(e, input, error, setError, setInput) }
            required
          />
          { isFormSubmitted &&
        error.email && <div className='MyAccountPersonal-Error OverlayForm-Error'>{ error.email }</div> }
        </div>
        <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <div className='OverlayForm-Label'>First name</div>
          <input
            type="text"
            name="firstName"
            placeholder='First name'
            className='MyAccountPersonal-TextField OverlayForm-TextField'
            value={ input.firstName }
            onChange={ (e) => onInputChange(e, input, error, setError, setInput) }
            required
          />
          { isFormSubmitted &&
        error.firstName && <div className='MyAccountPersonal-Error OverlayForm-Error'>{ error.firstName }</div> }
        </div>
        <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <div className='OverlayForm-Label'>Last name</div>
          <input
            type="text"
            name="lastName"
            placeholder='Last name'
            className='MyAccountPersonal-TextField OverlayForm-TextField'
            value={ input.lastName }
            onChange={ (e) => onInputChange(e, input, error, setError, setInput) }
            required
          />
          { isFormSubmitted &&
        error.lastName && <div className='MyAccountPersonal-Error OverlayForm-Error'>{ error.lastName }</div> }
        </div>
        <div className='MyAccountPersonal-TextFieldWrapper OverlayForm-TextFieldWrapper'>
          <div className='OverlayForm-Label'>Birthday</div>
          <FormDatePicker
            currentDate = { currentDate }
            setCurrentDate = { setCurrentDate }
            validationFunction = { () => validateBirthDate(currentDate, setError) }
          />
          { isFormSubmitted &&
        error.birthDate && <div className='MyAccountPersonal-Error OverlayForm-Error'>{ error.birthDate }</div> }
        </div>
        <div className='MyAccountPersonal-SubmitButtonWrapper'>
          <input
            type="submit"
            value="Save"
            className='MyAccountPersonal-SubmitButton OverlayForm-SubmitButton'
            onClick={ () => setIsFormSubmitted(true) }
          />
        </div>
      </form>
    </div>
  );
};
