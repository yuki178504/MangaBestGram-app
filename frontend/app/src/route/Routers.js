import { Routes, Route } from 'react-router-dom';
import { Home, TermsOfService, PrivacyPolicy, Contact, MyPage, ProfileEdit, ScenePost } from './Pages';

const Routers = () => {

  return (
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/terms-of-service' element={ <TermsOfService /> } />
        <Route path='/privacy-policy' element={ <PrivacyPolicy /> } />
        <Route path='/contact' element={ <Contact /> } />
        <Route path='/mypage' element={ <MyPage /> } />
        <Route path='/edit/:id' element={ <ProfileEdit /> } />
        <Route path='/comic/:id' element={ <ScenePost /> } />
      </Routes>
  )
}

export default Routers;
