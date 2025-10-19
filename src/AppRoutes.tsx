import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import About from './pages/About';
import Version from './pages/Version';
import FourOhFour from './pages/FourOhFour';
import EleanorRoutes from './pages/eleanor/Routes';
import AmesworthRoutes from './pages/amesworth/Routes';

const AppRoutes = (): ReactElement => (
  <>
    <Routes>
      <Route path={ROUTES.HOME.route} element={<Home />} />
      <Route path={ROUTES.ABOUT.route} element={<About />} />
      <Route path={ROUTES.VERSION.route} element={<Version />} />
      {EleanorRoutes}
      {AmesworthRoutes}
      <Route path='*' element={<FourOhFour />} />
    </Routes>
  </>
);

export default AppRoutes;
