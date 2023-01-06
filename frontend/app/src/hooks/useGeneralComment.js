import { useQuery } from "react-query"
import { generalComment } from "../api/generalComment"

export const useGeneralComment = () => {
  const useGetGeneralComment = (scenePostId) => {
    return useQuery({
      queryKey: [
        'general_comment',
        { scenePostId: scenePostId },
      ],
      queryFn: () =>
      generalComment.getGeneralComment(
        scenePostId
      ),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  return { useGetGeneralComment }
}
