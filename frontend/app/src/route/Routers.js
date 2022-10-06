import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Pages';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
    </Routes>
  )
}

export default Routers;
