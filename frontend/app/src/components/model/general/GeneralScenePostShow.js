import { useNavigate, useParams, Link } from "react-router-dom";
import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import scenePostShow from "../../../css/model/scene_post/scenePostShow.module.css";
import subMenu from '../../../css/ui/subMenu.module.css';
import { AiFillHome } from "react-icons/ai";
import { BsBookFill, BsFillReplyFill, BsFillPencilFill, BsCalendar3, BsNewspaper, BsFillJournalBookmarkFill, BsReceipt } from "react-icons/bs";
import noimage from "../../../image/default.png";

const GeneralScenePostShow = () => {
  const navigate = useNavigate();
  const { scene_post_id } = useParams();

  const { useShowGeneralScenePost } = useGeneralScenePost();
  const { data: scene_post, isLoading} = useShowGeneralScenePost(scene_post_id);

  if(isLoading) return <ReactLoading type="spin" color="blue" className='loading' />

  return (
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span className={subMenu.home}>
            <Link to={`/general_scene_post/${scene_post.data.attributes.scenePostComicTitle}/${scene_post.data.attributes.comicId}`} className={subMenu["home-link"]}><span> / { scene_post.data.attributes.scenePostComicTitle }</span></Link>
          </span>
          <span className={subMenu["scene-title"]}>
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
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-fill-pencil-fill"]}><BsFillPencilFill /></span>【シーンのサブタイトル】</p>
              <div>{ scene_post.data.attributes.subTitle }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-receipt"]}><BsReceipt /></span>【シーンの内容】</p>
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
              <p className={scenePostShow.detail}><span className={scenePostShow["bs-newspaper"]}><BsNewspaper /></span>【シーンの詳細・感想】</p>
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
