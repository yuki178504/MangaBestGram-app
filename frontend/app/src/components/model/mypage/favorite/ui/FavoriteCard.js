import { Link } from "react-router-dom";
import noimage from "../../../../../image/default.png";
import generalScenePostCss from '../../../../../css/model/general/generalScenePostCss.module.css';
import { FcFilm, FcContacts, FcSms, FcMms, FcCalendar } from "react-icons/fc";
import { useGeneralComment } from "../../../../../hooks/useGeneralComment";
import ReactLoading from "react-loading";
import moment from 'moment';

const FavoriteCard = ({
  Id,
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
    <div className={generalScenePostCss.content}>
      <div className={generalScenePostCss["innner-content"]}>
        <div className={generalScenePostCss.list}>
          <div className={generalScenePostCss["user-name"]}><img className={generalScenePostCss["user-image"]} src={ favoriteUserImage } alt='画像' onError={(e) => e.target.src = noimage} />{ favoriteUserName }</div>
          <div className={generalScenePostCss["detail-area"]}>
            <p className={generalScenePostCss.detail}><span className={generalScenePostCss["react-icon"]}><FcFilm /></span>サブタイトル</p>
            <div>{ favoriteSubTitle }</div>
          </div>
          <div className={generalScenePostCss["detail-area"]}>
            <p className={generalScenePostCss.detail}><span className={generalScenePostCss["react-icon"]}><FcContacts /></span>シーンの話数</p>
            <div>{ favoriteNumber }話</div>
          </div>
          <div className={generalScenePostCss["detail-area-link"]}>
            <Link to={`/general_scene_post/general_scene_post_show/${Id}`} className={generalScenePostCss["link-show"]}><span className={generalScenePostCss["react-icon"]}><FcMms /></span>シーンを見る</Link>
          </div>
        </div>
        <div className={generalScenePostCss["favorite-outer-image"]}>
          <div className={generalScenePostCss["detail-area-image"]}>
          <div className={generalScenePostCss["create-at"]}><span className={generalScenePostCss["detail-text"]}><span className={generalScenePostCss["react-icon"]}><FcCalendar /></span>{ moment(favoriteCreatedAt).format('YYYY年MM月DD日HH:mm') }</span></div>
            <img className={generalScenePostCss["favorite-image"]} src={ favoriteImage } alt='画像' onError={(e) => e.target.src = noimage} />
            <div className={generalScenePostCss['detail-area-count']}>
              <div className={generalScenePostCss['detail-area-list']}>
                <div><span className={generalScenePostCss["react-icon"]}><FcSms /></span>コメント&nbsp;{ generalComments.data.length }件</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
