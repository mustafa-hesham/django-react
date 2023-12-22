import { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CategoryPage from 'Route/CategoryPage';
import Home from 'Route/HomePage';

class RouterComponent extends PureComponent {
  render() {
    return (
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:category">
          <CategoryPage />
        </Route>
      </Router>
    );
  }
}
export default RouterComponent;
