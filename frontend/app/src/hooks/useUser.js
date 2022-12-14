import { useContext } from "react"
import { useQuery } from "react-query";
import { user } from "../api/user";
import { AuthContext } from "../providers/AuthGuard"

export const useUser = () => {
  const { token } = useContext(AuthContext);
  //取得用関数
  const useGetUser = () => {
    return useQuery({
      queryKey: 'user',
      queryFn: () => user.getUser(token),
      staleTime: 30000000,
      cacheTime: 0,
      retry: false,
    });
  };
  return { useGetUser };
};
