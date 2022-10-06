import React from 'react'
import './css/App.css';
import Routers from './route/Routers';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routers />
    </Router>
  );
}

export default App;
