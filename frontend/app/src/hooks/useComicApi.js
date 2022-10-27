import { useContext } from "react";
import { comicApi } from "../api/comicApi";
import { AuthContext } from "../providers/AuthGuard";
import { useQuery } from 'react-query';

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
  return { useGetComic };
};
