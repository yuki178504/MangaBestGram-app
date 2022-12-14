import { Link } from "react-router-dom";
import noimage from "../../../../../image/default.png";
import generalScenePostCss from '../../../../../css/model/general/generalScenePostCss.module.css';
import { BsBookFill, BsJournalBookmarkFill, BsFillChatRightDotsFill } from "react-icons/bs";
import { useGeneralComment } from "../../../../../hooks/useGeneralComment";
import ReactLoading from "react-loading";

const FavoriteCard = ({
  Id,
  favoriteUserImage,
  favoriteUserName,
  favoriteSubTitle,
  favoriteNumber,
  favoriteImage
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
            <p className={generalScenePostCss.detail}><span className={generalScenePostCss["bs-book-fill"]}><BsBookFill /></span>【サブタイトル】</p>
            <div>{ favoriteSubTitle }</div>
          </div>
          <div className={generalScenePostCss["detail-area"]}>
            <p className={generalScenePostCss.detail}><span className={generalScenePostCss["bs-journal-book-mark-fill"]}><BsJournalBookmarkFill /></span>【シーンの話数】</p>
            <div>{ favoriteNumber }話</div>
          </div>
          <div className={generalScenePostCss["detail-area-link"]}>
            <Link to={`/general_scene_post/general_scene_post_show/${Id}`} className={generalScenePostCss["link-show"]} >シーンを見る</Link>
          </div>
        </div>
        <div className={generalScenePostCss["outer-image"]}>
          <div className={generalScenePostCss["detail-area-image"]}>
            <img className={generalScenePostCss.image} src={ favoriteImage } alt='画像' onError={(e) => e.target.src = noimage} />
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

export default FavoriteCard;
