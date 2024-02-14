import './Modal.style.scss';

import CloseButton from 'Component/CloseButton';
import { noopFn } from 'Util/General';

export default function Modal(props) {
  const {
    header,
    body,
    footer,
    isDisplayModal,
    setIsDisplayModal = noopFn,
    onCloseFunction = noopFn
  } = props;

  const className = isDisplayModal ? 'Modal Modal_Displayed' : 'Modal';

  return (
    <div className={ className }>
      <div className='Modal-ModalCloseButton'>
        <CloseButton
          Click={ () => {
            onModalCloseFunction(setIsDisplayModal, onCloseFunction);
          } }
        />
      </div>
      { header && header() }
      { body && body() }
      { footer && footer() }
    </div>
  );
};

function onModalCloseFunction(setIsDisplayModal, onCloseFunction) {
  setIsDisplayModal(false);
  onCloseFunction();
};
