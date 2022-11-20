import { useParams, Link } from "react-router-dom";
import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import generalScenePostCss from '../../../css/model/general/generalScenePostCss.module.css';
import { AiFillHome } from "react-icons/ai";
import GeneralScenePostCard from "./ui/GeneralScenePostCard";
import { AuthContext } from "../../../providers/AuthGuard";
import { useContext } from "react";

const GeneralScenePost = () => {
  const { comic_id, comic_title } = useParams();
  const { useGetGeneralScenePost, useGetLoginGeneralScenePost } = useGeneralScenePost();
  const { isAuthenticated } = useContext(AuthContext);

  const { data: scene_posts, isLoading } = useGetGeneralScenePost(comic_id);
  const { data: general_scene_posts, isLoading: general_loading } = useGetLoginGeneralScenePost(comic_id);

  if(isLoading) return <ReactLoading type="spin" color='blue' />
  if(general_loading) return <ReactLoading type="spin" color='blue' />
  console.log(scene_posts)
  console.log(general_scene_posts)

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
        {isAuthenticated ? (
          <>
            {general_scene_posts.data.map((scene_post, index) => (
              <GeneralScenePostCard
                key={index}
                scenePostId={scene_post.id}
                scenePostUserImage={scene_post.attributes.scene_post_user_image.url}
                scenePostUserName={scene_post.attributes.scene_post_user_name}
                scenePostTitle={scene_post.attributes.scene_title}
                scenePostDate={scene_post.attributes.scene_date}
                scenePostImage={scene_post.attributes.scene_image.url}
                favorite={scene_post.attributes.favorite}
                comicTitle={comic_title}
              />
            ))}
          </>
        ) : (
          <>
            {scene_posts.data?.map((scene_post, index) => (
              <GeneralScenePostCard
                key={index}
                scenePostId={scene_post.id}
                scenePostUserImage={scene_post.attributes.scenePostUserImage.url}
                scenePostUserName={scene_post.attributes.scenePostUserName}
                scenePostTitle={scene_post.attributes.sceneTitle}
                scenePostDate={scene_post.attributes.sceneDate}
                scenePostImage={scene_post.attributes.sceneImage.url}
                favorite={scene_post.attributes.favorite}
                comicTitle={comic_title}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GeneralScenePost;
