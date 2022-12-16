import { useParams, Link, useNavigate } from "react-router-dom";
import { useScenePost } from "../../../hooks/useScenePost";
import ReactLoading from "react-loading";
import scenePostShow from "../../../css/model/scene_post/scenePostShow.module.css";
import subMenu from '../../../css/ui/subMenu.module.css';
import { AiFillHome } from "react-icons/ai";
import { FcReading, FcFilm, FcKindle, FcSms, FcCalendar, FcContacts, FcNews, FcUpLeft } from "react-icons/fc";
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
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={subMenu["home-link"]}><span>/ マイページ</span></Link>
          </span>
          <span className={subMenu["scene-title"]}>
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
            <p className={scenePostShow["comic-title"]}><span className={scenePostShow["react-icon"]}><FcReading /></span>{ comic_title }</p>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["react-icon"]}><FcFilm /></span>シーンのサブタイトル</p>
              <div>{ scene_post.sub_title }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["react-icon"]}><FcNews /></span>シーンの内容</p>
              <div>{ scene_post.scene_title }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["react-icon"]}><FcContacts /></span>シーンの話数</p>
              <div>{ scene_post.scene_number }話</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["react-icon"]}><FcCalendar /></span>シーンを見た日付</p>
              <div>{ scene_post.scene_date }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["react-icon"]}><FcKindle /></span>シーンの詳細・感想</p>
              <div>{ scene_post.scene_content }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <button onClick={() => navigate(-1)} className={scenePostShow.back}><span className={scenePostShow["react-icon"]}><FcUpLeft /></span>シーン一覧へ戻る</button>
            </div>
            <div className={scenePostShow["create-at"]}><span className={scenePostShow["detail-text"]}><span className={scenePostShow["react-icon"]}><FcCalendar /></span>{ moment(scene_post.created_at).format('YYYY年MM月DD日HH:mm') }</span></div>
            <div className={scenePostShow["detail-area-comment"]}>
              <div className={scenePostShow["detail-comment"]}><span className={scenePostShow["react-icon"]}><FcSms /></span>コメント一覧</div>
              <Comment scene_post_id={scene_post_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenePostShow;
