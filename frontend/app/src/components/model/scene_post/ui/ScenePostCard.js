import { Link } from "react-router-dom";
import scenePost from '../../../../css/model/scene_post/scenePost.module.css';
import moment from 'moment';
import { BsBookFill, BsJournalBookmarkFill, BsCalendar3, BsFillChatRightDotsFill } from "react-icons/bs";
import noimage from "../../../../image/default.png";
import ReactLoading from "react-loading";
import { useGeneralComment } from "../../../../hooks/useGeneralComment";

const ScenePostCard = ({
  scenePostId,
  scenePostSubTitle,
  scenePostNumber,
  scenePostImage,
  scenePostCreatedAt,
  comicTitle,
  comicId
}) => {
  const { useGetGeneralComment } = useGeneralComment();

  const { data: generalComments, isLoading } = useGetGeneralComment(scenePostId);

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={scenePost.content}>
      <div className={scenePost["innner-content"]}>
        <div className={scenePost["outer-image"]}>
          <img className={scenePost.image} src={ scenePostImage } alt='画像' onError={(e) => e.target.src = noimage} />
        </div>
        <div className={scenePost.list}>
          <div className={scenePost["detail-area"]}>
              <p className={scenePost.detail}><span className={scenePost["bs-book-fill"]}><BsBookFill /></span>【サブタイトル】</p>
              <div>{ scenePostSubTitle}</div>
          </div>
          <div className={scenePost["detail-area"]}>
            <p className={scenePost.detail}><span className={scenePost["bs-journal-book-mark-fill"]}><BsJournalBookmarkFill /></span>【話数】</p>
            <div>{ scenePostNumber }話</div>
          </div>
        </div>
        <div className={scenePost["link-list"]}>
          <Link to={`/scene_post/${comicTitle}/${scenePostId}`} className={scenePost["link-show"]} >シーンを見る</Link>
          <Link to={`/scene_post/${comicId}/${comicTitle}/${scenePostId}/scene_post_edit`} className={scenePost["link-edit"]} >編集する</Link>
        </div>
        <div className={scenePost["create-at"]}><span className={scenePost["detail-text"]}><span className={scenePost["bs-calender-3"]}><BsCalendar3 /></span>{ moment(scenePostCreatedAt).format('YYYY年MM月DD日HH:mm') }</span></div>
        <div className={scenePost['detail-area-count']}>
          <div className={scenePost['detail-area-list']}>
            <div><span className={scenePost["bs-fill-chat-right-dots-fill"]}><BsFillChatRightDotsFill /></span>コメント&nbsp;{ generalComments.data.length }件</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenePostCard;
