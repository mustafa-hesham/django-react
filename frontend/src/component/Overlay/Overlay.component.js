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

  const handleClickOutside = (e) => {
    const {
      current,
      current: {
        className
      }
    } = overlayRef;

    const {
      target
    } = e;

    if (current && !current.contains(target) && className.includes('Clicked') && isOverlayToggled &&
     !buttonRef.current.contains(target)) {
      dispatch(toggleFunction(!isOverlayToggled));
    }
  };

  useEffect(() => {
    window.addEventListener(
        'mousedown', (e) => (
          handleClickOutside(e)
        )
    );

    return () => {
      window.removeEventListener(
          'mousedown', (e) => (
            handleClickOutside(e)
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
