import { useContext } from "react";
import { comicApi } from "../api/comicApi";
import { AuthContext } from "../providers/AuthGuard";
import { useQuery, useQueryClient, useMutation } from 'react-query';

export const useComicApi = () => {
  const { token } = useContext(AuthContext);

  const useGetComic = () => {
    return useQuery({
      queryKey: 'comic',
      queryFn: () => comicApi.getComic(token),
      staleTime: 300000,
      cacheTime: 300000,
    });
  };

  const useCreateComic = () => {
    const queryClient = useQueryClient();
    const queryKey = 'comic';

    const updater = (previousData, data) => {
      previousData.data.unshift({
        attributes: data.comics,
      });
      return previousData;
    };

    return useMutation(
      async (params) => {
        return await comicApi.createComic(
          params,
          token || ''
        );
      },
      {
        onMutate: async (data) => {
          await queryClient.cancelQueries(queryKey);
          const previousData = await queryClient.getQueryData(queryKey);

          if (previousData) {
            queryClient.setQueryData(queryKey, () => {
              return updater(previousData, data);
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

  return { useGetComic, useCreateComic };
};
