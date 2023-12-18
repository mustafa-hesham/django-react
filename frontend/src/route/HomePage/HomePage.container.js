import { PureComponent } from 'react';
import { connect } from 'react-redux';

import HomePageComponent from './HomePage.component';

export const mapDispatchToProps = () => ({});

export const mapStateToProps = () => ({});

class HomePageContainer extends PureComponent {
  containerFunctions = {};

  containerProps() {
    return {};
  }

  render() {
    return (
      <HomePageComponent
        { ...this.containerFunctions }
        { ...this.containerProps() }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
