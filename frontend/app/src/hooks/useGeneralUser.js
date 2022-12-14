import { useQuery } from "react-query";
import { generalUser } from "../api/generalUser";

export const useGeneralUser = () => {
  const useGetGeneralUser = () => {
    return useQuery({
      queryKey: 'general_user',
      queryFn: () => generalUser.getGeneralUser(),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  const useShowGeneralUser = (userId) => {
    return useQuery({
      queryKey: [
        'general_user_show',
        { userId: userId }
      ],
      queryFn: () => generalUser.showGeneralUser(
        userId
      ),
      enabled: !!userId,
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  const useGetGeneralUserComic = (userId) => {
    return useQuery({
      queryKey: [
        'general_user_comic',
        { userId: userId }
      ],
      queryFn: () => generalUser.getGeneralUserComic(
        userId
      ),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  const useGetGeneralScenePostCount = (userId) => {
    return useQuery({
      queryKey: [
        'general_scene_post_count',
        { userId: userId }
      ],
      queryFn: () => generalUser.getGeneralUserScenePostCount(
        userId
      ),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  return { useGetGeneralUser, useShowGeneralUser, useGetGeneralUserComic, useGetGeneralScenePostCount };
};
