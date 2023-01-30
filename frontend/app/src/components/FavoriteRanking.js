import { useGeneralScenePost } from "../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";

const FavoriteRanking = () => {
  const { useGetFavoritesRanking } = useGeneralScenePost();
  const { data: favorites_ranking, isLoading } = useGetFavoritesRanking();

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  console.log(favorites_ranking)

  return(
    <>
      {favorites_ranking.map((favorite_ranking) => (
        <div>{ favorite_ranking.sceneTitle }</div>
      ))}
    </>
  );
};

export default FavoriteRanking;
