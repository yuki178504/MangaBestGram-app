import { useContext, useState } from "react";
import generalScenePost from '../../../../css/model/general/generalScenePost.module.css';
import noimage from "../../../../image/default.png";
import scenery from "../../../../image/scenery.png";
import { FcFilm, FcContacts, FcCalendar, FcMms, FcSms, FcLikePlaceholder } from "react-icons/fc";
import UnFavoriteButton from "../../../ui/UnFavoriteButton";
import FavoriteButton from "../../../ui/FavoriteButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthGuard";
import { useGeneralComment } from "../../../../hooks/useGeneralComment";
import ReactLoading from "react-loading";
import moment from 'moment';
import { useFavorite } from "../../../../hooks/useFavorite";
import { UserInformationName } from "../../../ui/UserInformationDisplay";

const GeneralScenePostCard = ({
  scenePostId,
  scenePostSubTitle,
  scenePostUserImage,
  scenePostCreatedAt,
  scenePostUserName,
  scenePostNumber,
  scenePostImage,
  favorite,
  comicTitle
}) => {
  const [ favoriteState, setFavoriteState ] = useState(favorite);
  const { isAuthenticated, loginWithRedirect } = useContext(AuthContext);

  const { useGetGeneralComment } = useGeneralComment();
  const { useGetFavorites_count } = useFavorite();

  const { data: generalComments, isLoading } = useGetGeneralComment(scenePostId);
  const { data: favorites, favoritesLoading } = useGetFavorites_count(scenePostId);
  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  if(favoritesLoading) return <></>

  return (
    <div className={generalScenePost.content}>
      <div className={generalScenePost["innner-content"]}>
        <div className={generalScenePost.list}>
          <div className={generalScenePost["user-name"]}>
            <img className={generalScenePost["user-image"]} src={ scenePostUserImage } alt='画像' onError={(e) => e.target.src = noimage} />
            <UserInformationName userName={scenePostUserName} />
            { scenePostUserName }
          </div>
          <div className={generalScenePost["outer-favorite"]}>
            {isAuthenticated ? (
              <>
                {favoriteState ? (
                  <UnFavoriteButton
                    id={scenePostId}
                    changeFavorite={setFavoriteState}
                  />
                ) : (
                  <FavoriteButton
                    id={scenePostId}
                    changeFavorite={setFavoriteState}
                  />
                )}
              </>
            ) : (
              <button
                className={generalScenePost.favorite}
                type='submit'
                onClick={() => {
                  loginWithRedirect();
                }}
              ><FcLikePlaceholder /></button>
            )}
            <div className={generalScenePost["favorite-count"]}>{ favorites?.length }</div>
          </div>
          <div className={generalScenePost["detail-area"]}>
            <p className={generalScenePost.detail}><span className={generalScenePost["react-icon"]}><FcFilm /></span>サブタイトル</p>
            <div>{ scenePostSubTitle }</div>
          </div>
          <div className={generalScenePost["detail-area"]}>
            <p className={generalScenePost.detail}><span className={generalScenePost["react-icon"]}><FcContacts /></span>シーンの話数</p>
            <div>{ scenePostNumber }話</div>
          </div>
          <div className={generalScenePost["detail-area-link"]}>
            <Link to={`/general_scene_post/${comicTitle}/general_scene_post_show/${scenePostId}`} className={generalScenePost["link-show"]} ><span className={generalScenePost["react-icon"]}><FcMms /></span>シーンを見る</Link>
          </div>
        </div>
        <div className={generalScenePost["outer-image"]}>
          <div className={generalScenePost["detail-area-image"]}>
            <div className={generalScenePost["create-at"]}><span className={generalScenePost["detail-text"]}><span className={generalScenePost["react-icon"]}><FcCalendar /></span>{ moment(scenePostCreatedAt).format('YYYY年MM月DD日HH:mm') }</span></div>
            <img className={generalScenePost.image} src={ scenePostImage } alt='画像' onError={(e) => e.target.src = scenery} />
            <div className={generalScenePost['detail-area-count']}>
              <div className={generalScenePost['detail-area-list']}>
                <div><span className={generalScenePost["react-icon"]}><FcSms /></span>コメント&nbsp;{ generalComments.data.length }件</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralScenePostCard;
