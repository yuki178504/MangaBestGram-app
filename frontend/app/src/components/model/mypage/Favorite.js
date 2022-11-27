import { useFavorite } from "../../../hooks/useFavorite";
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import noimage from "../../../image/default.png";
import generalScenePostCss from '../../../css/model/general/generalScenePostCss.module.css';
import favorite from '../../../css/model/mypage/favorite.module.css';
import { BsBookFill, BsJournalBookmarkFill } from "react-icons/bs";

const Favorite = () => {
  const { useGetFavorite } = useFavorite();
  const { data: favorites, isLoading } = useGetFavorite();

  if(isLoading) return <ReactLoading type="spin" color='blue' />

  return (
    <div className={favorite.wrapper}>
      <div className={favorite.count}>【投稿数】 : {favorites.data.length}件</div>
      <div className={favorite['main-content']}>
        {favorites.data.map((favorite) => (
          <div key={favorite.id} className={generalScenePostCss.content}>
            <div className={generalScenePostCss["innner-content"]}>
              <div className={generalScenePostCss.list}>
                <div className={generalScenePostCss["user-name"]}><img className={generalScenePostCss["user-image"]} src={ favorite.attributes.scene_post_user_image } alt='画像' onError={(e) => e.target.src = noimage} />{ favorite.attributes.scene_post_user_name }</div>
                <div className={generalScenePostCss["detail-area"]}>
                  <p className={generalScenePostCss.detail}><span className={generalScenePostCss["bs-book-fill"]}><BsBookFill /></span>【シーン名】</p>
                  <div>{ favorite.attributes.scene_title }</div>
                </div>
                <div className={generalScenePostCss["detail-area"]}>
                  <p className={generalScenePostCss.detail}><span className={generalScenePostCss["bs-journal-book-mark-fill"]}><BsJournalBookmarkFill /></span>【シーンの日付】</p>
                  <div>{ favorite.attributes.scene_date }</div>
                </div>
                <div className={generalScenePostCss["detail-area-link"]}>
                  <Link to={`/general_scene_post/general_scene_post_show/${favorite.id}`} className={generalScenePostCss["link-show"]} >シーンを見る</Link>
                </div>
              </div>
              <div className={generalScenePostCss["outer-image"]}>
                <img className={generalScenePostCss.image} src={ favorite.attributes.scene_image.url } alt='画像' onError={(e) => e.target.src = noimage} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
