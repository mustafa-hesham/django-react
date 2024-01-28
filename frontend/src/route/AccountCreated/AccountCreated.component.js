import './AccountCreated.style.scss';

import Header from 'Component/Header';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessIcon from 'Style/icons/Success/success-green-check-mark-icon.png';

import { CONTINUE, SUCCESS, SUCCESS_MESSAGE } from './AccountCreated.config';

export default function AccountCreated() {
  const {
    email,
    firstName,
    lastName
  } = useParams();

  const navigate = useNavigate();

  return (
    <div className='AccountCreated'>
      <Header />
      <div className='AccountCreated-Body'>
        <img src={ SuccessIcon } className='AccountCreated-SuccessIcon'/>
        <div className='AccountCreated-Success'>{ SUCCESS }</div>
        <div className='AccountCreated-Greeting'>{ `Congratulations, ${firstName} ${lastName}!` }</div>
        <div className='AccountCreated-Greeting'>{ SUCCESS_MESSAGE }</div>
        <div className='AccountCreated-Email'>{ `Your email address: ${email}` }</div>
        <div className='AccountCreated-ButtonWrapper'>
          <button
            className='AccountCreated-Button OverlayForm-SubmitButton'
            onClick={ () => navigate('/') }
          >
            { CONTINUE }
          </button>
        </div>
      </div>
    </div>
  );
};
