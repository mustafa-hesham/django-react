import './AccountOverlay.style.scss';

import {
  CREATE_ACCOUNT,
  LOGIN } from 'Component/Account/Account.config';
import AccountLogin from 'Component/AccountLogin';
import CloseButton from 'Component/CloseButton';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateToggleAccountOverlay } from 'Store/AccountOverlay/AccountOverlayReducer.reducer';

export default function AccountOverlay(props) {
  const { accountRef, isOverlayToggled } = props;
  const overlayRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener(
        'mousedown', (e) => (
          handleClickOutside(e, dispatch, accountRef, overlayRef, isOverlayToggled)
        )
    );

    return () => {
      document.removeEventListener(
          'mousedown', (e) => (
            handleClickOutside(e, dispatch, accountRef, overlayRef, isOverlayToggled)
          )
      );
    };
  }, [isOverlayToggled]);

  const className = isOverlayToggled ? 'AccountOverlay AccountOverlay_Clicked' : 'AccountOverlay';

  return (
    <div
      className={ className }
      ref={ overlayRef }
    >
      { renderCloseButton(dispatch, isOverlayToggled) }
      { renderTitle() }
      { renderLogin() }
    </div>
  );
};

function handleClickOutside(e, dispatch, accountRef, overlayRef, isOverlayToggled) {
  const {
    current
  } = overlayRef;

  const {
    target
  } = e;

  if (current && !current.contains(target) && isOverlayToggled && accountRef && !accountRef.current.contains(target)) {
    dispatch(updateToggleAccountOverlay(!isOverlayToggled));
  }
};

function renderTitle() {
  return (
    <div className='AccountOverlay-Title'>
      <h2>{ LOGIN }</h2>
      <h2>{ CREATE_ACCOUNT }</h2>
    </div>
  );
};

function closeAccountOverlay(dispatch, isOverlayToggled) {
  if (!isOverlayToggled) {
    return;
  }

  dispatch(updateToggleAccountOverlay(false));
};

function renderCloseButton(dispatch, isOverlayToggled) {
  return (
    <div className='AccountOverlay-CloseButton'>
      <CloseButton Click={ () => closeAccountOverlay(dispatch, isOverlayToggled) }/>
    </div>
  );
};

function renderLogin() {
  return (
    <div className='AccountOverlay-Login'>
      <AccountLogin />
    </div>
  );
};
