import { Route } from 'react-router-dom';

import ROUTES from '../../AppRouteNames';

// import Home from './Home';
import Home from './Echo';

const AppRoutes = (
  <Route path={ROUTES.ECHO.route} element={<Home />}></Route>
);

export default AppRoutes;
