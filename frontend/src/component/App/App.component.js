import React from 'react';
import './App.scss';
import { PureComponent } from 'react';
import Header from 'Component/Header';

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
