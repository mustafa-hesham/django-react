import './CloseButton.style.scss';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { ReactComponent as CloseButtonIcon } from 'Style/icons/CloseButton/closeButtonIcon.svg';

class CloseButtonComponent extends PureComponent {
  static propTypes = {
    Click: PropTypes.func.isRequired
  };

  render() {
    const {
      Click
    } = this.props;

    return (
      <div className='CloseButton'>
        <CloseButtonIcon className='CloseButton-Icon' onClick={ Click }/>
      </div>
    );
  }
}

export default CloseButtonComponent;
