import './App.scss';

import Header from 'Component/Header';
import Router from 'Component/Router';
import { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { getStore } from 'Store';

class AppComponent extends PureComponent {
  render() {
    const store = getStore();

    return (
      <Provider store={ store }>
        <div className="App">
          <Header />
          <Router />
        </div>
      </Provider>
    );
  }
}

export default AppComponent;
