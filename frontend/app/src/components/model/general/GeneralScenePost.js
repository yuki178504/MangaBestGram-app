import { useParams, Link } from "react-router-dom";
import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import generalScenePostCss from '../../../css/model/general/generalScenePostCss.module.css';
import { AiFillHome } from "react-icons/ai";
import noimage from "../../../image/default.png";
import { BsBookFill, BsJournalBookmarkFill } from "react-icons/bs";

const GeneralScenePost = () => {
  const { comic_id, comic_title } = useParams();
  const { useGetGeneralScenePost } = useGeneralScenePost();

  const { data: scene_posts, isLoading } = useGetGeneralScenePost(comic_id);

  if(isLoading) return <ReactLoading type="spin" color='blue' />
  console.log(scene_posts)

  return (
    <div className={generalScenePostCss.wrapper}>
      <div className={generalScenePostCss["top-list"]}>
        <div className={generalScenePostCss.title}>
          <span className={generalScenePostCss.home}>
            <Link to='/' className={generalScenePostCss["home-link"]}><span className={generalScenePostCss["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
        </div>
      </div>
      <div className={generalScenePostCss["main-content"]}>
        {scene_posts?.map((scene_post) => (
          <div key={scene_post.id} className={generalScenePostCss.content}>
            <div className={generalScenePostCss["innner-content"]}>
              <div className={generalScenePostCss.list}>
                <div className={generalScenePostCss["user-name"]}><img className={generalScenePostCss["user-image"]} src={ scene_post.user.image.url } alt='画像' onError={(e) => e.target.src = noimage} />{ scene_post.user.name }</div>
                <div className={generalScenePostCss["detail-area"]}>
                  <p className={generalScenePostCss.detail}><span className={generalScenePostCss["bs-book-fill"]}><BsBookFill /></span>【シーン名】</p>
                  <div>{ scene_post.sceneTitle }</div>
                </div>
                <div className={generalScenePostCss["detail-area"]}>
                  <p className={generalScenePostCss.detail}><span className={generalScenePostCss["bs-journal-book-mark-fill"]}><BsJournalBookmarkFill /></span>【シーンの日付】</p>
                  <div>{ scene_post.sceneDate }</div>
                </div>
                <div className={generalScenePostCss["detail-area-link"]}>
                  <Link to={`/general_scene_post/${comic_title}/general_scene_post_show/${scene_post.id}`} className={generalScenePostCss["link-show"]} >シーンを見る</Link>
                </div>
              </div>
              <div className={generalScenePostCss["outer-image"]}>
                <img className={generalScenePostCss.image} src={ scene_post.sceneImage.url } alt='画像' onError={(e) => e.target.src = noimage} />
              </div>
            </div>
          </div>
          ))}
      </div>
    </div>
  )
};

export default GeneralScenePost;
