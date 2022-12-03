import { Routes, Route } from 'react-router-dom';
import {
  Home,
  TermsOfService, 
  PrivacyPolicy, 
  MyPage, 
  ProfileEdit, 
  ScenePost, 
  ScenePostNew, 
  ComicEdit, 
  ScenePostShow, 
  ScenePostEdit, 
  GeneralScenePost, 
  GeneralComic,
  GeneralScenePostShow,
  Page404,
  MyProfile
} from './Pages';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/terms-of-service' element={ <TermsOfService /> } />
      <Route path='/privacy-policy' element={ <PrivacyPolicy /> } />
      <Route path='/mypage/' element={ <MyPage /> } />
      {/* <Route path='/profile_edit/:user_id' element={ <ProfileEdit /> } /> */}
      <Route path='/comic/:comic_id/:comic_title' element={ <ScenePost /> } />
      <Route path='/comic/:comic_id/:comic_title/scene_post_new' element={ <ScenePostNew /> } />
      <Route path='/scene_post/:comic_title/:scene_post_id' element={ <ScenePostShow /> } />
      <Route path='/scene_post/:comic_id/:comic_title/:scene_post_id/scene_post_edit' element={ <ScenePostEdit /> } />
      <Route path='/comic/:comic_id/:comic_title/comic_edit' element={ <ComicEdit /> } />
      <Route path='/general_scene_post/:comic_title/:comic_id' element={ <GeneralScenePost /> } />
      <Route path='/general_scene_post/:comic_title/general_scene_post_show/:scene_post_id/' element={ <GeneralScenePostShow /> } />
      <Route path='/general_scene_post/general_scene_post_show/:scene_post_id/' element={ <GeneralScenePostShow /> } />
      <Route path='/comic' element={ <GeneralComic /> } />
      <Route path='*' element={ <Page404 /> } />
      <Route path='/my-profile/:user_id' element={ <MyProfile /> } />
    </Routes>
  );
};

export default Routers;
