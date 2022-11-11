import { useQuery } from "react-query"
import { generalScenePost } from "../api/generalScenePost"

export const useGeneralScenePost = () => {
  const useGetGeneralScenePost = (comicId) => {
    return useQuery({
      queryKey: [
        'general_scene_post',
        { comicId: comicId },
      ],
      queryFn: () =>
        generalScenePost.getGeneralScenePost(
          comicId
        ),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  const useShowGeneralScenePost = (scenePostId) => {
    return useQuery({
      queryKey: [
        'general_scene_post_show',
        { scenePostId: scenePostId }
      ],
      queryFn: () =>
        generalScenePost.showGeneralScenePost(
          scenePostId
        ),
      enabled: !!scenePostId,
      staleTime: 30000000,
      cacheTime: 0,
    });
  };
  return { useGetGeneralScenePost, useShowGeneralScenePost }
}
