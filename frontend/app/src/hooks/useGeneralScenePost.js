import { useContext } from "react";
import { useQuery } from "react-query"
import { generalScenePost } from "../api/generalScenePost"
import { AuthContext } from "../providers/AuthGuard";

export const useGeneralScenePost = () => {
  const { token } = useContext(AuthContext);

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
        { scenePostId: scenePostId },
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

  const useGetLoginGeneralScenePost = (comicId) => {
    return useQuery({
      queryKey: [
        'login_general_scene_post',
        { comicId: comicId },
      ],
      queryFn: () =>
        generalScenePost.getLoginGeneralScenePost(
          comicId,
          token || ''
        ),
        staleTime: 30000000,
        cacheTime: 0,
        retry: false,
    });
  };

  const useGetFavoritesRanking = () => {
    return useQuery({
      queryKey: 'favorites_ranking',
      queryFn: () => generalScenePost.getFavoritesRanking(),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  return { useGetGeneralScenePost, useShowGeneralScenePost, useGetLoginGeneralScenePost, useGetFavoritesRanking }
}
