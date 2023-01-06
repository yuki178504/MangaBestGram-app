import { useQuery } from 'react-query';
import { generalComic } from '../api/generalComic';

export const useGeneralComic = () => {
  //全ユーザーが閲覧できる最新の投稿３つの投稿一覧をuseQueryで定義
  const useGetGeneralLatestComic = () => {
    return useQuery({
      queryKey: 'general_latest_comic',
      queryFn: () => generalComic.getGeneralLatestComic(),
      staleTime: 300000,
      cacheTime: 0,
    });
  };

  const useGetGeneralComic = () => {
    return useQuery({
      queryKey: 'general_comic',
      queryFn: () => generalComic.getGeneralComic(),
      staleTime: 300000,
      cacheTime: 0,
    });
  };

  //全ユーザーが閲覧できる投稿の詳細
  const useShowGeneralComic = (comicId) => {
    return useQuery({
      queryKey: [
        'general_comic_show',
        { comicId: comicId }
      ],
      queryFn: () => generalComic.showGeneralComic(
        comicId
      ),
      enabled: !!comicId,
      staleTime: 30000000,
      cacheTime: 0,
    });
  };
  return { useGetGeneralLatestComic, useGetGeneralComic, useShowGeneralComic };
};
