import { useContext } from "react"
import { useQuery } from "react-query";
import { favorite } from "../api/favorite";
import { AuthContext } from "../providers/AuthGuard"

export const useFavorite = () => {
  const { token } = useContext(AuthContext);

  const useGetFavorite = () => {
    return useQuery({
      queryKey: 'favorite',
      queryFn: () => favorite.getFavorite(token),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  return { useGetFavorite };
};
