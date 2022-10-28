import { useContext } from "react"
import { scenePost } from "../api/scenePost";
import { AuthContext } from "../providers/AuthGuard"
import { useQuery } from 'react-query';


export const useScenePost = () => {
  const { token } = useContext(AuthContext);

  //投稿したシーンの一覧を取得
  const useGetScenePost = (comicId) => {
    return useQuery({
      queryKey: [
        'scene_post',
        { comicId: comicId },
      ],
      queryFn: () =>
        scenePost.getScenePost(
          comicId,
          token || ''
        ),
      staleTime: 30000000,
      cacheTime: 30000000,
    });
  };
  return { useGetScenePost }
};
