import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, TermsOfService, PrivacyPolicy, Contact, MyPage, ProfileEdit } from './Pages';
import { AuthContext } from '../providers/AuthGuard';

const Routers = () => {
  const { Private } = useContext(AuthContext);

  return (
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/terms-of-service' element={ <TermsOfService /> } />
        <Route path='/privacy-policy' element={ <PrivacyPolicy /> } />
        <Route path='/contact' element={ <Contact /> } />
        <Route path='/mypage' element={ <Private><MyPage /></Private> } />
        <Route path='/edit/:id' element={ <Private><ProfileEdit /></Private> } />
      </Routes>
  )
}

export default Routers;
