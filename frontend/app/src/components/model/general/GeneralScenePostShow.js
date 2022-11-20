import { useNavigate, useParams, Link } from "react-router-dom";
import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import scenePostShow from "../../../css/model/comic/scenePostShow.module.css";
import { AiFillHome } from "react-icons/ai";
import { BsBookFill, BsFillReplyFill, BsFillPencilFill, BsCalendar3, BsNewspaper, BsFillJournalBookmarkFill } from "react-icons/bs";
import noimage from "../../../image/default.png";

const GeneralScenePostShow = () => {
  const navigate = useNavigate();
  const { scene_post_id } = useParams();

  const { useShowGeneralScenePost } = useGeneralScenePost();
  const { data: scene_post, isLoading} = useShowGeneralScenePost(scene_post_id);

  if(isLoading) return <ReactLoading type="spin" color="blue" />
  console.log(scene_post)

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
            / { scene_post.data.attributes.sceneTitle }の詳細画面
          </span>
        </div>
      </div>
      <div className={scenePostShow.section}>
        <div className={scenePostShow.content}>
          <div className={scenePostShow["outer-image"]}>
            <img className={scenePostShow.image} src={ scene_post.data.attributes.sceneImage.url } alt='画像' onError={(e) => e.target.src = noimage} />
          </div>
          <div className={scenePostShow.article}>
            <p className={scenePostShow["comic-title"]}><span className={scenePostShow["bs-book-fill"]}><BsBookFill /></span>{ scene_post.data.attributes.scenePostComicTitle }</p>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-fill-pencil-fill"]}><BsFillPencilFill /></span>【シーンのタイトル】</p>
              <div>{ scene_post.data.attributes.sceneTitle }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-fill-journal-bookmark-fill"]}><BsFillJournalBookmarkFill /></span>【シーンの話数】</p>
              <div>{ scene_post.data.attributes.sceneNumber }話</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-calender-3"]}><BsCalendar3 /></span>【そのシーンを見た日付】</p>
              <div>{ scene_post.data.attributes.sceneDate }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-newspaper"]}><BsNewspaper /></span>【シーンの内容】</p>
              <div>{ scene_post.data.attributes.sceneContent }</div>
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

export default GeneralScenePostShow;
