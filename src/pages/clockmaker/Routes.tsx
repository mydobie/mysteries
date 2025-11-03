import { Route } from 'react-router-dom';

import ROUTES from '../../AppRouteNames';

// import Home from './Home';
import Home from './Clockmaker';

const AppRoutes = (
  <Route path={ROUTES.CLOCKMAKER.route} element={<Home />}></Route>
);

export default AppRoutes;
