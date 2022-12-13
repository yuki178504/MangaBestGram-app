import { useParams, Link, useNavigate } from "react-router-dom";
import { useScenePost } from "../../../hooks/useScenePost";
import ReactLoading from "react-loading";
import scenePostShow from "../../../css/model/scene_post/scenePostShow.module.css";
import { AiFillHome } from "react-icons/ai";
import { BsBookFill, BsFillReplyFill, BsFillPencilFill, BsCalendar3, BsNewspaper, BsFillJournalBookmarkFill, BsReceipt } from "react-icons/bs";
import noimage from "../../../image/default.png";
import moment from 'moment';
import Comment from "../comment/Comment";

const ScenePostShow = () => {
  const navigate = useNavigate();
  const { scene_post_id, comic_title } = useParams();

  const { useShowScenePost } = useScenePost();
  const { data: scene_post, isLoading } = useShowScenePost(scene_post_id);

  if(isLoading) return <ReactLoading type="spin" color="blue" className='loading' />

  return (
    <div className={scenePostShow.wrapper}>
      <div className={scenePostShow["top-list"]}>
        <div className={scenePostShow.title}>
          <span className={scenePostShow.home}>
            <Link to='/' className={scenePostShow["home-link"]}><span className={scenePostShow["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={scenePostShow["home-link"]}><span>/ マイページ</span></Link>
          </span>
          <span className={scenePostShow["scene-title"]}>
            / { scene_post.sub_title }の詳細画面
          </span>
        </div>
      </div>
      <div className={scenePostShow.section}>
        <div className={scenePostShow.content}>
          <div className={scenePostShow["outer-image"]}>
            <img className={scenePostShow.image} src={ scene_post.scene_image.url } alt='画像' onError={(e) => e.target.src = noimage} />
          </div>
          <div className={scenePostShow.article}>
            <p className={scenePostShow["comic-title"]}><span className={scenePostShow["bs-book-fill"]}><BsBookFill /></span>{ comic_title }</p>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-fill-pencil-fill"]}><BsFillPencilFill /></span>【シーンのサブタイトル】</p>
              <div>{ scene_post.sub_title }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-receipt"]}><BsReceipt /></span>【シーンの内容】</p>
              <div>{ scene_post.scene_title }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-fill-journal-bookmark-fill"]}><BsFillJournalBookmarkFill /></span>【シーンの話数】</p>
              <div>{ scene_post.scene_number }話</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-calender-3"]}><BsCalendar3 /></span>【シーンを見た日付】</p>
              <div>{ scene_post.scene_date }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-newspaper"]}><BsNewspaper /></span>【シーンの詳細・感想】</p>
              <div>{ scene_post.scene_content }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <button onClick={() => navigate(-1)} className={scenePostShow.back}><span className={scenePostShow["bs-fill-replay-fill"]}><BsFillReplyFill /></span>シーン一覧へ戻る</button>
            </div>
            <div className={scenePostShow["create-at"]}><span className={scenePostShow["detail-text"]}><span className={scenePostShow["bs-calender-3"]}><BsCalendar3 /></span>{ moment(scene_post.created_at).format('YYYY年MM月DD日HH:mm') }</span></div>
            <div className={scenePostShow["detail-area-comment"]}>
              <div className={scenePostShow["detail-comment"]}>【コメント一覧】</div>
              <Comment scene_post_id={scene_post_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenePostShow;
