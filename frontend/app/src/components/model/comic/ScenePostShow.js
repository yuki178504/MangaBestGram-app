import { useParams } from "react-router-dom";
import { useScenePost } from "../../../hooks/useScenePost";
import ReactLoading from "react-loading";

const ScenePostShow = () => {
  const { scene_post_id } = useParams();

  const { useShowScenePost } = useScenePost();
  const { data: scene_posts, isLoading } = useShowScenePost(scene_post_id);

  if(isLoading) return <ReactLoading type="spin" />
  console.log(scene_posts);

  return (
    <>
    </>

  );
};

export default ScenePostShow;
