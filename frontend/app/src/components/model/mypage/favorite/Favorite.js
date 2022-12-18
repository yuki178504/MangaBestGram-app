import { useFavorite } from "../../../../hooks/useFavorite";
import ReactLoading from "react-loading";
import favorite from '../../../../css/model/mypage/favorite.module.css';
import { FcSearch } from "react-icons/fc";
import { useState } from "react";
import FavoriteCard from "./ui/FavoriteCard";

const Favorite = () => {
  const { useGetFavorite } = useFavorite();
  const { data: favorites, isLoading } = useGetFavorite();

  let data = favorites === undefined ? [{ length: 0 }] : favorites.data;

  const [searchText, setSearchText] = useState('');

  const searchKeywords = searchText.trim().match(/[^\s]+/g);
  if (searchKeywords !== null) {
    data = favorites.data.filter((favorite) =>
      searchKeywords.every(
        (kw) => favorite.attributes.sub_title.indexOf(kw) !== -1
      )
    );
  }

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  console.log(data)

  return (
    <div className={favorite.wrapper}>
      <div className={favorite.count}>【投稿数】 {favorites.data.length}件</div>
      <div className={favorite.search}>
      <span className={favorite["fc-search"]}><FcSearch /></span>
        <input
          className={favorite["search-text"]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={'サブタイトルを検索'}
        />
      </div>
      { data.length === 0 && (
        <div className={favorite["detail-result"]}>検索結果がありません</div>
      ) }
      <div className={favorite['main-content']}>
        {data.map((favorite, index) => (
          <FavoriteCard 
            key={index}
            Id= {favorite.id}
            favoriteUserImage={favorite.attributes.scene_post_user_image.url}
            favoriteUserName={favorite.attributes.scene_post_user_name}
            favoriteSubTitle={favorite.attributes.sub_title}
            favoriteNumber={favorite.attributes.scene_number}
            favoriteImage={favorite.attributes.scene_image.url}
            favoriteCreatedAt={favorite.attributes.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
