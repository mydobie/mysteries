import { Route } from 'react-router-dom';

import ROUTES from '../../AppRouteNames';

import Home from './Home';
import Intro from './Intro';
import Task1 from './task1/Question';
import Task2 from './task2/QuestionsHome';
import Task3 from './task3/QuestionsHome';

const AppRoutes = (
  <Route path={ROUTES.ELEANOR.route} element={<Home />}>
    <Route index element={<Intro />} />
    <Route path={'1'} element={<Task1 />} />
    <Route path={'2'} element={<Task2 />} />
    <Route path={'3'} element={<Task3 />} />
  </Route>
);

export default AppRoutes;
