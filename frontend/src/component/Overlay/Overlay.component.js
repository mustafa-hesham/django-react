import './Overlay.style.scss';

import CloseButton from 'Component/CloseButton';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function Overlay(props) {
  const {
    buttonRef,
    isOverlayToggled,
    toggleFunction,
    header,
    body,
    footer
  } = props;

  const overlayRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener(
        'mousedown', (e) => (
          handleClickOutside(e, dispatch, buttonRef, overlayRef, isOverlayToggled, toggleFunction)
        )
    );

    return () => {
      document.removeEventListener(
          'mousedown', (e) => (
            handleClickOutside(e, dispatch, buttonRef, overlayRef, isOverlayToggled)
          )
      );
    };
  }, [isOverlayToggled]);

  const overlayClassName = isOverlayToggled ? 'Overlay Overlay_Clicked' : 'Overlay';

  return (
    <div
      className={ overlayClassName }
      ref={ overlayRef }
    >
      { renderCloseButton(dispatch, isOverlayToggled, toggleFunction) }
      { header && header() }
      { body && body() }
      { footer && footer() }
    </div>
  );
};

function handleClickOutside(e, dispatch, buttonRef, overlayRef, isOverlayToggled, toggleFunction) {
  const {
    current
  } = overlayRef;

  const {
    target
  } = e;

  if (current && !current.contains(target) && isOverlayToggled && buttonRef && !buttonRef.current.contains(target)) {
    dispatch(toggleFunction(!isOverlayToggled));
  }
};

function closeAccountOverlay(dispatch, isOverlayToggled, toggleFunction) {
  if (!isOverlayToggled) {
    return;
  }

  dispatch(toggleFunction(false));
};

function renderCloseButton(dispatch, isOverlayToggled, toggleFunction) {
  return (
    <div className='Overlay-CloseButton'>
      <CloseButton Click={ () => closeAccountOverlay(dispatch, isOverlayToggled, toggleFunction) }/>
    </div>
  );
};
