import { Routes, Route } from 'react-router-dom';
import { Home, TermsOfService, PrivacyPolicy, Contact, MyPage, ProfileEdit, ScenePost, ScenePostNewForm, ComicEdit } from './Pages';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/terms-of-service' element={ <TermsOfService /> } />
      <Route path='/privacy-policy' element={ <PrivacyPolicy /> } />
      <Route path='/contact' element={ <Contact /> } />
      <Route path='/mypage/' element={ <MyPage /> } />
      <Route path='/edit/:id' element={ <ProfileEdit /> } />
      <Route path='/comic/:comic_id/:comic_title' element={ <ScenePost /> } />
      <Route path='/comic/:comic_id/scene_post_new' element={ <ScenePostNewForm /> } />
      <Route path='/comic/:comic_id/:comic_title/comic_edit' element={ <ComicEdit /> } />
    </Routes>
  )
}

export default Routers;
