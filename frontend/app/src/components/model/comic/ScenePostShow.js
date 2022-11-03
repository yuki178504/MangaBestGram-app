import { useParams, Link, useNavigate } from "react-router-dom";
import { useScenePost } from "../../../hooks/useScenePost";
import ReactLoading from "react-loading";
import scenePostShow from "../../../css/model/comic/scenePostShow.module.css";
import { AiFillHome } from "react-icons/ai";
import { BsBookFill, BsFillReplyFill, BsFillPencilFill, BsCalendar3, BsNewspaper, BsFillJournalBookmarkFill } from "react-icons/bs";

const ScenePostShow = () => {
  const navigate = useNavigate();
  const { scene_post_id } = useParams();

  const { useShowScenePost } = useScenePost();
  const { data: scene_post, isLoading } = useShowScenePost(scene_post_id);

  if(isLoading) return <ReactLoading type="spin" />

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
            / { scene_post.scene_title }の詳細画面
          </span>
        </div>
      </div>
      <div className={scenePostShow.section}>
        <div className={scenePostShow.content}>
          <div className={scenePostShow.img}>
            画像
          </div>
          <div className={scenePostShow.article}>
            <p className={scenePostShow["comic-title"]}><span className={scenePostShow["bs-book-fill"]}><BsBookFill /></span>漫画のタイトル</p>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-fill-pencil-fill"]}><BsFillPencilFill /></span>【シーンのタイトル】</p>
              <div>{ scene_post.scene_title }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-fill-journal-bookmark-fill"]}><BsFillJournalBookmarkFill /></span>【シーンの話数】</p>
              <div>{ scene_post.scene_number }話</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-calender-3"]}><BsCalendar3 /></span>【そのシーンを見た日付】</p>
              <div>{ scene_post.scene_date }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-newspaper"]}><BsNewspaper /></span>【シーンの内容】</p>
              <div>{ scene_post.scene_content }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <button onClick={() => navigate(-1)} className={scenePostShow.back}><span className={scenePostShow["bs-fill-replay-fill"]}><BsFillReplyFill /></span>シーン一覧へ戻る</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenePostShow;
