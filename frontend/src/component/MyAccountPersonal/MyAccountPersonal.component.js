import './MyAccountPersonal.style.scss';

import { INITIAL_CUSTOMER_VALUES } from 'Component/AccountCreateAccount/AccountCreateAccount.config';
import { PERSONAL_INFORMATION } from 'Component/AccountOverlay/AccountOverlay.config';
import FormDatePicker from 'Component/FormDatePicker';
import Modal from 'Component/Modal';
import { updateCustomer } from 'Query/Account.query';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerState } from 'Store/Customer/CustomerReducer.reducer';
import EditIcon from 'Style/icons/Edit/edit.png';
import { setCustomerData } from 'Util/Customer';
import { onInputChange, validateBirthDate } from 'Util/General';
import { showNotificationMessage } from 'Util/ShowNotification';

export default function MyAccountPersonal() {
  const customer = useSelector((state) => state.CustomerReducer.customer);
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(customer.birthDate || '1971-01-01'));
  const [input, setInput] = useState({
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName
  });
  const [error, setError] = useState({
    email: '',
    firstName: '',
    lastName: '',
    birthDate: ''
  });
  const dispatch = useDispatch();

  return (
    <div className='MyAccountPersonal'>
      <div className='MyAccountPersonal-EditIconWrapper'>
        <img
          className='MyAccountPersonal-EditIcon'
          src={ EditIcon }
          onClick={ () => onModalOpenFunction(
              isDisplayModal,
              setIsDisplayModal,
              customer,
              setInput,
              setError,
              setCurrentDate
          ) }
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
            customer,
            input,
            error,
            setError,
            setInput,
            isFormSubmitted,
            setIsFormSubmitted,
            currentDate,
            setCurrentDate,
            dispatch
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
    customer,
    input,
    error,
    setError,
    setInput,
    isFormSubmitted,
    setIsFormSubmitted,
    currentDate,
    setCurrentDate,
    dispatch
) {
  return (
    <div
      className='MyAccountPersonal-Modal'
    >
      <form
        className='MyAccountPersonal-EditForm'
        onSubmit={ (event) => handleUpdateCustomer(event, customer, error, isFormSubmitted, dispatch) }
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

function onModalOpenFunction(isDisplayModal, setIsDisplayModal, customer, setInput, setError, setCurrentDate) {
  setIsDisplayModal(!isDisplayModal);
  setInput({
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    birthDate: customer.birthDate
  });

  setError({
    email: '',
    firstName: '',
    lastName: '',
    birthDate: ''
  });

  setCurrentDate(new Date(customer.birthDate || '1971-01-01'));
};

async function handleUpdateCustomer(event, customer, error, isFormSubmitted, dispatch) {
  event.preventDefault();

  const {
    target: {
      email: {
        value: emailValue
      },
      firstName: {
        value: firstNameValue
      },
      lastName: {
        value: lastNameValue
      },
      DatePicker: {
        value: datePickerValue
      }
    }
  } = event;

  if (isFormSubmitted && !!Object.values(error).find((value) => !!value)) {
    return;
  }

  const {
    updateCustomer: {
      customer: {
        email,
        firstName,
        lastName,
        birthDate
      }
    } = INITIAL_CUSTOMER_VALUES,
    message: errorMessage
  } = await updateCustomer(customer.id, emailValue, firstNameValue, lastNameValue, datePickerValue);

  if (!errorMessage && email) {
    setCustomerData(
        { ...customer, email: email, firstName: firstName, lastName: lastName, birthDate: birthDate }
    );
    dispatch(
        updateCustomerState(
            { ...customer, email: email, firstName: firstName, lastName: lastName, birthDate: birthDate }
        )
    );
    showNotificationMessage('warning', 'Personal information is updated successfully');
  } else {
    showNotificationMessage('error', errorMessage);
  }
}
