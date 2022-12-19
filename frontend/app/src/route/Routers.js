import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../providers/protectedRoute';
import {
  Home,
  TermsOfService, 
  PrivacyPolicy, 
  MyPage,
  ScenePost, 
  ScenePostNew, 
  ComicEdit, 
  ScenePostShow, 
  ScenePostEdit, 
  GeneralScenePost, 
  GeneralComic,
  GeneralScenePostShow,
  Page404,
  MyProfile,
  CommentNew,
  GeneralUser,
  GeneralUserComic,
  ComicConfirmDelete,
  ScenePostConfirmDelete
} from './Pages';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/terms-of-service' element={ <TermsOfService /> } />
      <Route path='/privacy-policy' element={ <PrivacyPolicy /> } />
      <Route path='/mypage/' element={ <ProtectedRoute component={MyPage}/> } />
      <Route path='/comic/:comic_id/:comic_title' element={ <ProtectedRoute component={ScenePost}/> } />
      <Route path='/comic/:comic_id/:comic_title/scene_post_new' element={ <ProtectedRoute component={ScenePostNew}/> } />
      <Route path='/scene_post/:comic_title/:scene_post_id' element={ <ProtectedRoute component={ScenePostShow}/> } />
      <Route path='/scene_post/:comic_id/:comic_title/:scene_post_id/scene_post_edit' element={ <ProtectedRoute component={ScenePostEdit}/> } />
      <Route path='/scene_post/:comic_id/:comic_title/:scene_post_id/scene_post_confirm_delete' element={ <ProtectedRoute component={ScenePostConfirmDelete}/> } />
      <Route path='/comic/:comic_id/:comic_title/comic_edit' element={ <ProtectedRoute component={ComicEdit}/> } />
      <Route path='/comic/:comic_id/:comic_title/comic_confirm_delete' element={ <ProtectedRoute component={ComicConfirmDelete}/> } />
      <Route path='/general_scene_post/:comic_title/:comic_id' element={ <GeneralScenePost /> } />
      <Route path='/general_scene_post/:comic_title/general_scene_post_show/:scene_post_id/' element={ <GeneralScenePostShow /> } />
      <Route path='/general_scene_post/general_scene_post_show/:scene_post_id/' element={ <GeneralScenePostShow /> } />
      <Route path='/comic' element={ <GeneralComic /> } />
      <Route path='*' element={ <Page404 /> } />
      <Route path='/my-profile/:user_id' element={ <ProtectedRoute component={MyProfile}/> } />
      <Route path='/general_scene_post/:comic_title/:scene_post_id/comment' element={ <ProtectedRoute component={CommentNew}/> } />
      <Route path='/users' element={ <GeneralUser /> } />
      <Route path='/users/:user_id/comics' element={ <GeneralUserComic /> } />
    </Routes>
  );
};

export default Routers;
