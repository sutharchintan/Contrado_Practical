import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Loader } from './components/loader/loader';

const RootComponent = lazy(() => import('./components/index'));

const App = () => {
  return (
    <Suspense fallback={<Loader loading={true} />}>
      <Router>
        <RootComponent />
      </Router>
    </Suspense>
  );
}

export default App;
