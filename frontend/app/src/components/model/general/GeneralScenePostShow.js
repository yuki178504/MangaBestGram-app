import { useNavigate, useParams, Link } from "react-router-dom";
import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import scenePostShow from "../../../css/model/scene_post/scenePostShow.module.css";
import subMenu from '../../../css/ui/subMenu.module.css';
import { AiFillHome } from "react-icons/ai";
import { FcReading, FcFilm, FcKindle, FcSms, FcCalendar, FcContacts, FcNews, FcUpLeft } from "react-icons/fc";
import scenery from "../../../image/scenery.png";
import Comment from "../comment/Comment";
import { AuthContext } from "../../../providers/AuthGuard";
import { useContext } from "react";
import moment from 'moment';

const GeneralScenePostShow = () => {
  const navigate = useNavigate();
  const { scene_post_id } = useParams();
  const { isAuthenticated, loginWithRedirect } = useContext(AuthContext);

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
            <img className={scenePostShow.image} src={ scene_post.data.attributes.sceneImage.url } alt='画像' onError={(e) => e.target.src = scenery} />
          </div>
          <div className={scenePostShow.article}>
            <p className={scenePostShow["comic-title"]}><span className={scenePostShow["react-icon"]}><FcReading /></span>{ scene_post.data.attributes.scenePostComicTitle }</p>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["react-icon"]}><FcFilm /></span>シーンのサブタイトル</p>
              <div>{ scene_post.data.attributes.subTitle }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["react-icon"]}><FcNews /></span>シーンの内容</p>
              <div>{ scene_post.data.attributes.sceneTitle }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["react-icon"]}><FcContacts /></span>シーンの話数</p>
              <div>{ scene_post.data.attributes.sceneNumber }話</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["react-icon"]}><FcCalendar /></span>そのシーンを見た日付</p>
              <div>{ scene_post.data.attributes.sceneDate }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <p className={scenePostShow.detail}><span className={scenePostShow["react-icon"]}><FcKindle /></span>シーンの詳細・感想</p>
              <div>{ scene_post.data.attributes.sceneContent }</div>
            </div>
            <div className={scenePostShow["detail-area"]}>
              <button onClick={() => navigate(`/general_scene_post/${scene_post.data.attributes.scenePostComicTitle}/${scene_post.data.attributes.comicId}`)} className={scenePostShow.back}><span className={scenePostShow["react-icon"]}><FcUpLeft /></span>シーン一覧へ戻る</button>
            </div>
            <div className={scenePostShow["create-at"]}><span className={scenePostShow["detail-text"]}><span className={scenePostShow["react-icon"]}><FcCalendar /></span>{ moment(scene_post.data.attributes.createdAt).format('YYYY年MM月DD日HH:mm') }</span></div>
            {isAuthenticated ? (
              <div className={scenePostShow["detail-area-comment"]}>
                <Link className={scenePostShow.comment} to={`/general_scene_post/${scene_post.data.attributes.scenePostComicTitle}/${scene_post_id}/comment`}><span className={scenePostShow["react-icon"]}><FcSms /></span>コメントする</Link>
              </div>
            ) : (
              <div className={scenePostShow["detail-area-comment"]}>
                <button className={scenePostShow.comment} onClick={() => { loginWithRedirect(); }}><span className={scenePostShow["react-icon"]}><FcSms /></span>コメントする</button>
              </div>
            )}
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

export default GeneralScenePostShow;
