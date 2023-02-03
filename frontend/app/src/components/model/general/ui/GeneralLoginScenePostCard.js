import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorite } from "../../../../hooks/useFavorite";
import { useGeneralComment } from "../../../../hooks/useGeneralComment";
import FavoriteButton from "../../../ui/FavoriteButton";
import UnFavoriteButton from "../../../ui/UnFavoriteButton";
import { UserInformationName } from "../../../ui/UserInformationDisplay";
import { FcFilm, FcContacts, FcCalendar, FcMms, FcSms } from "react-icons/fc";
import moment from 'moment';
import noimage from "../../../../image/default.png";
import scenery from "../../../../image/scenery.png";
import generalScenePost from '../../../../css/model/general/generalScenePost.module.css';

const GeneralLoginScenePostCard = ({
  scenePostId,
  scenePostSubTitle,
  scenePostUserImage,
  scenePostCreatedAt,
  scenePostUserName,
  scenePostNumber,
  scenePostImage,
  favorite,
  comicTitle,
  userId
}) => {
  const [ favoriteState, setFavoriteState ] = useState(favorite);

  const { useGetGeneralComment } = useGeneralComment();
  const { useGetFavorites_count } = useFavorite();

  const { data: generalComments, isLoading } = useGetGeneralComment(scenePostId);
  const { data: favorites, favoritesLoading } = useGetFavorites_count(scenePostId);

  if(isLoading) return <></>
  if(favoritesLoading) return <></>

  return (
    <div className={generalScenePost.content}>
      <div className={generalScenePost["innner-content"]}>
        <div className={generalScenePost.list}>
          <div className={generalScenePost["user-name"]}>
            <Link to={`/users/${userId}/comics`} >
              <img className={generalScenePost["user-image"]} src={ scenePostUserImage } alt='画像' onError={(e) => e.target.src = noimage} />
              <UserInformationName userName={scenePostUserName} />
              { scenePostUserName }
            </Link>
          </div>
          <div className={generalScenePost["outer-favorite"]}>
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

export default GeneralLoginScenePostCard;
