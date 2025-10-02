import { BrowserRouter, HashRouter } from 'react-router-dom';
import Header from './template/Header';
import Footer from './template/Footer';
import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import constants from './constants';

const Router = constants.USE_HASH === 'true' ? HashRouter : BrowserRouter;

function App() {
  const basename = '';

  return (
    <>
      <Router basename={basename}>
        <Header />
        <AppNavBar />

        <main>
          <AppRoutes />
        </main>

        <Footer />
      </Router>
    </>
  );
}

export default App;
