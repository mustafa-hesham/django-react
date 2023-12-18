import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import RouterComponent
  from './Router.component';

export const mapDispatchToProps = () => ({});

export const mapStateToProps = () => ({});

class RouterContainer extends PureComponent {
  containerFunctions = {};

  containerProps() {
    return {};
  }

  render() {
    return (
      <RouterComponent
        { ...this.containerFunctions }
        { ...this.containerProps() }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer);
