import './CloseButton.style.scss';

import { ReactComponent as CloseButtonIcon } from 'Style/icons/CloseButton/closeButtonIcon.svg';

export default function CloseButton(props) {
  const {
    Click
  } = props;

  return (
    <div className='CloseButton'>
      <CloseButtonIcon className='CloseButton-Icon' onClick={ Click }/>
    </div>
  );
};
