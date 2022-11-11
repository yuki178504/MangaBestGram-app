import { useParams, Link } from "react-router-dom";
import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import scenePost from '../../../css/model/comic/scenePost.module.css';
import { AiFillHome } from "react-icons/ai";
import noimage from "../../../image/default.png";

const GeneralScenePost = () => {
  const { comic_id } = useParams();
  const { useGetGeneralScenePost } = useGeneralScenePost();

  const { data: scene_posts, isLoading } = useGetGeneralScenePost(comic_id);

  if(isLoading) return <ReactLoading type="spin" color='blue' />
  console.log(scene_posts)

  return (
    <div className={scenePost.wrapper}>
      <div className={scenePost["top-list"]}>
        <div className={scenePost.title}>
          <span className={scenePost.home}>
            <Link to='/' className={scenePost["home-link"]}><span className={scenePost["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
        </div>
      </div>
      <div className={scenePost["main-content"]}>
        {scene_posts?.map((scene_post) => (
          <div key={scene_post.id} className={scenePost.content}>
            <div className={scenePost["innner-content"]}>
              <div className={scenePost["outer-image"]}>
                <img className={scenePost.image} src={ scene_post.sceneImage.url } alt='画像' onError={(e) => e.target.src = noimage} />
              </div>
              <div className={scenePost.list}>
                <p className={scenePost["list-title"]}>【{ scene_post.sceneTitle }】</p>
                <p className={scenePost["list-genre"]}>【{ scene_post.sceneContent }】</p>
              </div>
              <div className={scenePost["link-list"]}>
                {/* <Link to={`/scene_post/${comic_title}/${scene_post.id}`} className={scenePost["link-show"]} >シーンを見る</Link> */}
              </div>
            </div>
          </div>
          ))}
      </div>
    </div>
  )
};

export default GeneralScenePost;
