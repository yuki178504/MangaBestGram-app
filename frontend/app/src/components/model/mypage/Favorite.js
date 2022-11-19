import { useFavorite } from "../../../hooks/useFavorite";
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import noimage from "../../../image/default.png";
import scenePost from '../../../css/model/comic/scenePost.module.css';

const Favorite = () => {
  const { useGetFavorite } = useFavorite();
  const { data: favorites, isLoading } = useGetFavorite();

  if(isLoading) return <ReactLoading type="spin" color='blue' />
  console.log(favorites)

  return (
    <div className={scenePost.wrapper}>
      <div className={scenePost["main-content"]}>
        {favorites?.map((favorite) => (
          <div key={favorite.id} className={scenePost.content}>
            <div className={scenePost["innner-content"]}>
              <div className={scenePost["outer-image"]}>
                <img className={scenePost.image} src={ favorite.scene_image.url } alt='画像' onError={(e) => e.target.src = noimage} />
              </div>
              <div className={scenePost.list}>
                <p className={scenePost["list-title"]}>【{ favorite.scene_title }】</p>
                <p className={scenePost["list-genre"]}>【{ favorite.scene_content }】</p>
              </div>
              <div className={scenePost["link-list"]}>
                {/* <Link to={`/scene_post/${comic_title}/${favorite.id}`} className={scenePost["link-show"]} >シーンを見る</Link> */}
              </div>
            </div>
          </div>
          ))}
      </div>
    </div>
  );
};

export default Favorite;
