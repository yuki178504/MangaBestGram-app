import React from 'react'
import './css/App.css';
import Routers from './route/Routers';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <div className='main'>
        <Routers />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
