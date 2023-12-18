import React, { PureComponent } from 'react';
import { createBrowserRouter as router, RouterProvider } from 'react-router-dom';

import { ROUTES } from './Router.config';

class RouterComponent extends PureComponent {
  render() {
    return (
      <RouterProvider router={ router(ROUTES) } />
    );
  }
}
export default RouterComponent;
