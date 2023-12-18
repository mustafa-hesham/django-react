import React, { PureComponent } from 'react';
import { createBrowserRouter as router, RouterProvider } from 'react-router-dom';
import Home from 'Route/HomePage';

class RouterComponent extends PureComponent {
  Routes = router([
    {
      path: '/',
      element: <Home />,
    },
  ]);

  render() {
    return (
      <RouterProvider router={ this.Routes } />
    );
  }
}
export default RouterComponent;
