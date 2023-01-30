import { useContext } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { favorite } from "../api/favorite";
import { AuthContext } from "../providers/AuthGuard"

export const useFavorite = () => {
  const { token } = useContext(AuthContext);

  // お気に入り取得用
  const useGetFavorite = () => {
    return useQuery({
      queryKey: 'favorite',
      queryFn: () => favorite.getFavorite(token),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  // お気に入りカウント用
  const useGetFavorites_count = (scenePostId) => {
    return useQuery({
      queryKey: [
        'favorite',
      { scenePostId: scenePostId },
      ],
      queryFn: () =>
        favorite.getFavorites_count(
          scenePostId
        ),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  // お気に入り登録用
  const useCreateFavorite = () => {
    const queryClient = useQueryClient();
    const queryKey = 'favorite';

    return useMutation(
      async (params) => {
        return await favorite.createFavorite(
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

  // お気に入り削除用
  const useDeleteFavorite = (favoriteId) => {
    const queryClient = useQueryClient();
    const queryKey = 'favorite';

    return useMutation(
      async () => {
        return await favorite.deleteFavorite(
          favoriteId,
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

  return { useGetFavorite, useGetFavorites_count, useCreateFavorite, useDeleteFavorite };
};
