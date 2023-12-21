import noop from 'noop-ts';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CloseButtonComponent from './CloseButton.component';

export const mapDispatchToProps = () => ({});

export const mapStateToProps = () => ({});

class CloseButtonContainer extends PureComponent {
  static propTypes = {
    Click: PropTypes.func
  };

  static defaultProps = {
    Click: noop()
  };

  containerFunctions = { };

  containerProps() {
    const {
      Click
    } = this.props;

    return {
      Click
    };
  }

  render() {
    return (
      <CloseButtonComponent
        { ...this.containerFunctions }
        { ...this.containerProps() }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseButtonContainer);
