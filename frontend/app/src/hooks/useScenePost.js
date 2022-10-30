import { useContext } from "react"
import { scenePost } from "../api/scenePost";
import { AuthContext } from "../providers/AuthGuard"
import { useQuery, useQueryClient, useMutation } from 'react-query';


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

  //シーンの新規投稿
  const useCreateScenePost = (comicId) => {
    const queryClient = useQueryClient();
    const queryKey = [
      'scene_post',
      { comicId: comicId },
    ];

    const updater = (previousData, data) => {
      previousData.data.unshift({
        attributes: data.scene_posts,
      });
      return previousData;
    };

    return useMutation(
      async (params) => {
        return await scenePost.createScenePost(
          params,
          comicId,
          token || ''
        );
      },
      {
        onMutate: async (params) => {
          await queryClient.cancelQueries(queryKey);
          const previousData = await queryClient.getQueryData(queryKey);

          if (previousData) {
            queryClient.setQueryData(queryKey, () => {
              return updater(previousData, params);
            });
          }
          return previousData;
        },
        onError: (err, _, context) => {
          queryClient.setQueryData(queryKey, context);

          console.warn(err);
        },
        onSettled: () => {
          queryClient.invalidateQueries(queryKey);
        },
      }
    );
  };

  return { useGetScenePost, useCreateScenePost };
};