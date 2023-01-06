import { useContext } from "react";
import { comic } from "../api/comic";
import { AuthContext } from "../providers/AuthGuard";
import { useQuery, useQueryClient, useMutation } from 'react-query';

export const useComic = () => {
  const { token } = useContext(AuthContext);
  //取得用の関数
  const useGetComic = () => {
    return useQuery({
      queryKey: 'comic',
      queryFn: () => comic.getComic(token),
      staleTime: 300000,
      cacheTime: 0,
    });
  };

  //新規投稿用の関数
  const useCreateComic = () => {
    const queryClient = useQueryClient();
    const queryKey = 'comic';

    return useMutation(
      async (params) => {
        return await comic.createComic(
          params,
          token || ''
        );
      },
      {
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

  //更新用の関数
  const usePutComic = (comicId) => {
    const queryClient = useQueryClient();
    const queryKey = 'comic';

    return useMutation(
      async (params) => {
        return await comic.putComic(
          params,
          comicId,
          token || ''
        );
      },
      {
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

  //詳細用の関数
  const useShowComic = (comicId) => {
    return useQuery({
      queryKey: [
        'comic_show',
        { comicId: comicId }
      ],
      queryFn: () => comic.showComic(
        comicId,
        token || ''
      ),
      enabled: !!comicId,
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  //削除用の関数
  const useDeleteComic = (comicId) => {
    const queryClient = useQueryClient();
    const queryKey = 'comic';

    return useMutation(
      async () => {
        return await comic.deleteComic(
          comicId,
          token || ''
        );
      },
      {
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

  const useGetScenePostCount = () => {
    return useQuery({
      queryKey: 'scene_post_count',
      queryFn: () => comic.getScenePostCount(token),
      staleTime: 300000,
      cacheTime: 0,
    });
  };

  return { useGetComic, useCreateComic, useDeleteComic, usePutComic, useShowComic, useGetScenePostCount };
};
