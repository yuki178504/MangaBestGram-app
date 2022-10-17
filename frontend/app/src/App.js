import React from 'react'
import './css/App.css';
import Routers from './route/Routers';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthGuardProvider } from './providers/AuthGuard';

const App = () => {
  return (
    <Router>
      <AuthGuardProvider>
        <Header />
        <div className='main'>
          <Routers />
        </div>
        <Footer />
      </AuthGuardProvider>
    </Router>
  );
}

export default App;
