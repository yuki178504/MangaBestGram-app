import { useContext } from "react";
import { comicApi } from "../api/comicApi";
import { AuthContext } from "../providers/AuthGuard";
import { useQuery, useQueryClient, useMutation } from 'react-query';

export const useComicApi = () => {
  const { token } = useContext(AuthContext);
  //取得用の関数
  const useGetComic = () => {
    return useQuery({
      queryKey: 'comic',
      queryFn: () => comicApi.getComic(token),
      staleTime: 300000,
      cacheTime: 300000,
    });
  };

  //新規投稿用の関数
  const useCreateComic = () => {
    const queryClient = useQueryClient();
    const queryKey = 'comic';

    return useMutation(
      async (params) => {
        return await comicApi.createComic(
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
        return await comicApi.putComic(
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
      queryFn: () => comicApi.showComic(
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
        return await comicApi.deleteComic(
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

  return { useGetComic, useCreateComic, useDeleteComic, usePutComic, useShowComic };
};
