import { Link } from "react-router-dom";
import noimage from "../../../../../image/default.png";
import scenery from "../../../../../image/scenery.png";
import generalScenePost from '../../../../../css/model/general/generalScenePost.module.css';
import { FcFilm, FcContacts, FcSms, FcMms, FcCalendar } from "react-icons/fc";
import { useGeneralComment } from "../../../../../hooks/useGeneralComment";
import ReactLoading from "react-loading";
import moment from 'moment';
import { UserInformationName } from "../../../../ui/UserInformationDisplay";

const FavoriteCard = ({
  Id,
  favoriteComicTitle,
  favoriteUserImage,
  favoriteUserName,
  favoriteSubTitle,
  favoriteNumber,
  favoriteImage,
  favoriteCreatedAt
}) => {
  const { useGetGeneralComment } = useGeneralComment();

  const { data: generalComments, isLoading } = useGetGeneralComment(Id);
  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={generalScenePost.content}>
      <div className={generalScenePost["innner-content"]}>
        <div className={generalScenePost.list}>
          <div className={generalScenePost["user-name"]}>
            <img className={generalScenePost["user-image"]} src={ favoriteUserImage } alt='画像' onError={(e) => e.target.src = noimage} />
            <UserInformationName userName={favoriteUserName} />
            { favoriteUserName }
          </div>
          <div className={generalScenePost["detail-area"]}>
            <p className={generalScenePost.detail}><span className={generalScenePost["react-icon"]}><FcFilm /></span>サブタイトル</p>
            <div>{ favoriteSubTitle }</div>
          </div>
          <div className={generalScenePost["detail-area"]}>
            <p className={generalScenePost.detail}><span className={generalScenePost["react-icon"]}><FcContacts /></span>シーンの話数</p>
            <div>{ favoriteNumber }話</div>
          </div>
          <div className={generalScenePost["detail-area-link"]}>
            <Link to={`/general_scene_post/${favoriteComicTitle}/general_scene_post_show/${Id}`} className={generalScenePost["link-show"]}><span className={generalScenePost["react-icon"]}><FcMms /></span>シーンを見る</Link>
          </div>
        </div>
        <div className={generalScenePost["favorite-outer-image"]}>
          <div className={generalScenePost["detail-area-image"]}>
          <div className={generalScenePost["create-at"]}><span className={generalScenePost["detail-text"]}><span className={generalScenePost["react-icon"]}><FcCalendar /></span>{ moment(favoriteCreatedAt).format('YYYY年MM月DD日HH:mm') }</span></div>
            <img className={generalScenePost["favorite-image"]} src={ favoriteImage } alt='画像' onError={(e) => e.target.src = scenery} />
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

export default FavoriteCard;
