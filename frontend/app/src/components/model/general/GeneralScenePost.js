import { useParams, Link } from "react-router-dom";
import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import generalScenePostCss from '../../../css/model/general/generalScenePostCss.module.css';
import subMenu from '../../../css/ui/subMenu.module.css';
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

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  if(general_loading) return <ReactLoading type="spin" color='blue' className='loading' />
  console.log(scene_posts)

  return (
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span className={subMenu["comic-title"]}>
            / { comic_title }のシーン一覧
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
                scenePostSubTitle={scene_post.attributes.sub_title}
                scenePostUserImage={scene_post.attributes.scene_post_user_image.url}
                scenePostUserName={scene_post.attributes.scene_post_user_name}
                scenePostNumber={scene_post.attributes.scene_number}
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
                scenePostSubTitle={scene_post.attributes.subTitle}
                scenePostUserImage={scene_post.attributes.scenePostUserImage.url}
                scenePostUserName={scene_post.attributes.scenePostUserName}
                scenePostNumber={scene_post.attributes.sceneNumber}
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
