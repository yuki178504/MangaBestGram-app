import { useContext, useState } from "react";
import generalScenePostCss from '../../../../css/model/general/generalScenePostCss.module.css';
import noimage from "../../../../image/default.png";
import { BsBookFill, BsJournalBookmarkFill, BsBookmark, BsCalendar3, BsFillChatRightDotsFill } from "react-icons/bs";
import UnFavoriteButton from "../../../ui/UnFavoriteButton";
import FavoriteButton from "../../../ui/FavoriteButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthGuard";
import { useGeneralComment } from "../../../../hooks/useGeneralComment";
import ReactLoading from "react-loading";
import moment from 'moment';

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

  const { data: generalComments, isLoading } = useGetGeneralComment(scenePostId);
  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={generalScenePostCss.content}>
      <div className={generalScenePostCss["innner-content"]}>
        <div className={generalScenePostCss.list}>
          <div className={generalScenePostCss["user-name"]}><img className={generalScenePostCss["user-image"]} src={ scenePostUserImage } alt='画像' onError={(e) => e.target.src = noimage} />{ scenePostUserName }</div>
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
              className={generalScenePostCss.favorite}
              type='submit'
              value={`お気に入り`}
              onClick={() => {
                loginWithRedirect();
              }}
            ><BsBookmark /></button>
          )}
          <div className={generalScenePostCss["detail-area"]}>
            <p className={generalScenePostCss.detail}><span className={generalScenePostCss["bs-book-fill"]}><BsBookFill /></span>【サブタイトル】</p>
            <div>{ scenePostSubTitle }</div>
          </div>
          <div className={generalScenePostCss["detail-area"]}>
            <p className={generalScenePostCss.detail}><span className={generalScenePostCss["bs-journal-book-mark-fill"]}><BsJournalBookmarkFill /></span>【シーンの話数】</p>
            <div>{ scenePostNumber }話</div>
          </div>
          <div className={generalScenePostCss["detail-area-link"]}>
            <Link to={`/general_scene_post/${comicTitle}/general_scene_post_show/${scenePostId}`} className={generalScenePostCss["link-show"]} >シーンを見る</Link>
          </div>
        </div>
        <div className={generalScenePostCss["outer-image"]}>
          <div className={generalScenePostCss["detail-area-image"]}>
            <div className={generalScenePostCss["create-at"]}><span className={generalScenePostCss["detail-text"]}><span className={generalScenePostCss["bs-calender-3"]}><BsCalendar3 /></span>{ moment(scenePostCreatedAt).format('YYYY年MM月DD日HH:mm') }</span></div>
            <img className={generalScenePostCss.image} src={ scenePostImage } alt='画像' onError={(e) => e.target.src = noimage} />
            <div className={generalScenePostCss['detail-area-count']}>
              <div className={generalScenePostCss['detail-area-list']}>
                <div><span className={generalScenePostCss["bs-fill-chat-right-dots-fill"]}><BsFillChatRightDotsFill /></span>コメント&nbsp;{ generalComments.data.length }件</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralScenePostCard;
