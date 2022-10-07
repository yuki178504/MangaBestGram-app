import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, TermsOfService, PrivacyPolicy, SignIn } from './Pages';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/terms-of-service' element={ <TermsOfService /> } />
      <Route path='/privacy-policy' element={ <PrivacyPolicy /> } />
      <Route path='/signin' element={ <SignIn /> } />
    </Routes>
  )
}

export default Routers;
