import { PureComponent } from 'react';
import { getCategoryLocalStorage, updateCategoryLocalStorage } from 'Util/Category';

import AppComponent from './App.component';

class AppContainer extends PureComponent {
  containerFunctions ={};

  componentDidMount() {
    this.initializeReducers();
  }

  initializeReducers() {
    if (getCategoryLocalStorage()) {
      return;
    } else {
      updateCategoryLocalStorage('', []);
    }
  }

  containerProps() {}

  render() {
    return (
      <AppComponent
        { ...this.containerFunctions }
        { ...this.containerProps() }
      />
    );
  }
}

export default AppContainer;
