import { useGeneralScenePost } from "../../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import subMenu from '../../../../css/ui/subMenu.module.css';
import FavoriteRanking from '../../../../css/favoriteRanking.module.css';
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import GeneralFavoritesRankingCard from "./ui/GeneralFavoritesRankingCard";
import { FcFilm } from "react-icons/fc";

const GeneralFavoritesRanking = () => {
  const { useGetFavoritesRanking } = useGeneralScenePost();
  const { data: favorites_ranking, isLoading } = useGetFavoritesRanking();

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
      <div className={FavoriteRanking.title}>
        <div className={FavoriteRanking["title-text"]}><span className={subMenu["react-icons"]}><FcFilm /></span>漫画シーン人気ランキング<span className={subMenu["react-icons"]}><FcFilm /></span></div>
      </div>
      <div className={FavoriteRanking["main-content"]}>
        {favorites_ranking.data.map((scene_post, index) => (
          <GeneralFavoritesRankingCard
          key={index}
          index={index + 1}
          scenePostId={scene_post.id}
          scenePostSubTitle={scene_post.attributes.subTitle}
          scenePostUserImage={scene_post.attributes.scenePostUserImage.url}
          scenePostUserName={scene_post.attributes.scenePostUserName}
          scenePostNumber={scene_post.attributes.sceneNumber}
          scenePostImage={scene_post.attributes.sceneImage.url}
          scenePostCreatedAt={scene_post.attributes.createdAt}
          comicTitle={scene_post.attributes.scenePostComicTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default GeneralFavoritesRanking;
