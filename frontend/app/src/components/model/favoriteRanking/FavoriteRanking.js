import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FcFilm } from "react-icons/fc";
import subMenu from '../../../css/ui/subMenu.module.css';
import favoriteRanking from '../../../css/favoriteRanking.module.css';
import FavoriteRankingCard from "./ui/FavoriteRankingCard";

const FavoriteRanking = () => {
  const { useGetLoginFavoritesRanking } = useGeneralScenePost();

  const { data: favorites_ranking, isLoading } = useGetLoginFavoritesRanking();

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>/&nbsp;人気シーン一覧</span>
        </div>
      </div>
      <div className={favoriteRanking.title}>
        <div className={favoriteRanking["title-text"]}><span className={subMenu["react-icons"]}><FcFilm /></span>漫画シーン人気ランキング<span className={subMenu["react-icons"]}><FcFilm /></span></div>
      </div>
      <div className={favoriteRanking["main-content"]}>
        {favorites_ranking.data.map((scene_post, index) => (
          <FavoriteRankingCard
          key={index}
          index={index + 1}
          scenePostId={scene_post.id}
          scenePostSubTitle={scene_post.attributes.sub_title}
          scenePostUserImage={scene_post.attributes.scene_post_user_image.url}
          scenePostUserName={scene_post.attributes.scene_post_user_name}
          scenePostNumber={scene_post.attributes.scene_number}
          scenePostImage={scene_post.attributes.scene_image.url}
          scenePostCreatedAt={scene_post.attributes.created_at}
          favorite={scene_post.attributes.favorite}
          comicTitle={scene_post.attributes.scene_post_comic_title}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteRanking;
