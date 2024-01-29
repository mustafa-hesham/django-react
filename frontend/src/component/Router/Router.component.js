import { createBrowserRouter as router, RouterProvider } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { ROUTES } from './Router.config';

export default function Router() {
  return (
    <>
      <RouterProvider router={ router(ROUTES) } />
      <Tooltip id="my-tooltip" />
    </>
  );
};
