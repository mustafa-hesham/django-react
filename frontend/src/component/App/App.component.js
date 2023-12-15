import './App.scss';

import Header from 'Component/Header';
import React, { PureComponent } from 'react';

class AppComponent extends PureComponent {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default AppComponent;
