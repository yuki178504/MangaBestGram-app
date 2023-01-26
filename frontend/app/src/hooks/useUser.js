import { useContext } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query";
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
      cacheTime: 30000000,
      retry: false,
    });
  };

  const usePutUser = (UserId) => {
    const queryClient = useQueryClient();
    const queryKey = 'user';

    return useMutation(
      async (params) => {
        return await user.putUser(
          params,
          UserId,
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

  return { useGetUser, usePutUser };
};
