import { useGeneralScenePost } from "../../hooks/useGeneralScenePost";
import generalScenePost from '../../css/model/general/generalScenePost.module.css';
import { FcFilm } from "react-icons/fc";

const ScenePostCount = ({comicId}) => {
  const { useGetGeneralScenePost } = useGeneralScenePost();
  const { data: scene_posts, isLoading } = useGetGeneralScenePost(comicId);

  if(isLoading) return <></>

  return (
    <div>
      <span className={generalScenePost["react-icon"]}><FcFilm /></span>シーン数&nbsp;{ scene_posts.data.length }件
    </div>
  );
};

export default ScenePostCount;
