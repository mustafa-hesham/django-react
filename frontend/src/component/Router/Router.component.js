import { BrowserRouter, Route } from 'react-router-dom';
import CategoryPage from 'Route/CategoryPage';
import Home from 'Route/HomePage';

export default function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/:category">
        <CategoryPage />
      </Route>
    </BrowserRouter>
  );
};
