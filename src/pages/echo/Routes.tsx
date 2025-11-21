import { Route } from 'react-router-dom';

import ROUTES from '../../AppRouteNames';

import Home from './Home';

import CafeChat from './chat1/CafeChat';
import LibraryChat from './chat2/LibraryChat';
import Intro from './Intro';


const AppRoutes = (
  <Route path={ROUTES.ECHO.route} element={<Home />}>
    <Route index element={<Intro />} />
    <Route path={'1'} element={<CafeChat />} />
    <Route path={'2'} element={<LibraryChat />} />
  </Route>
);

export default AppRoutes;