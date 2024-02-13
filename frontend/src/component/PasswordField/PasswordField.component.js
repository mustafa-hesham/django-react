import './PasswordField.style.scss';

import { useState } from 'react';
import HidePassword from 'Style/icons/Password/hide-password.png';
import ShowPassword from 'Style/icons/Password/show-password.png';
import { noopFn } from 'Util/General';

export default function PasswordField(props) {
  const {
    isRequired = true,
    placeholder = 'Password',
    fieldName = 'password',
    value,
    onChange = noopFn,
    label = 'Password'
  } = props;

  const [isPassword, setIsPassword] = useState(true);

  const labelClassName = isRequired ?
  'AccountLogin-LoginTextField OverlayForm-Label OverlayForm-Label_Required' :
  'OverlayForm-Label';

  return (
    <div className='PasswordField'>
      <div className={ labelClassName }>{ label }</div>
      <div className='PasswordField-Wrapper'>
        <input
          type={ isPassword ? 'password' : 'text' }
          name={ fieldName }
          placeholder={ placeholder }
          className='OverlayForm-TextField'
          required={ isRequired }
          value={ value }
          onChange={ onChange }
        />
        <span
          className='PasswordField-IconSpan'
        >
          <img
            className='PasswordField-IconImage'
            src={ isPassword ? ShowPassword : HidePassword }
            onClick={ () => setIsPassword(!isPassword) }
          />
        </span>
      </div>
    </div>
  );
};
