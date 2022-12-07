import { useGeneralComic } from "../../../hooks/useGeneralComic";
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import noimage from "../../../image/default.png";
import generalComic from "../../../css/model/general/generalComic.module.css";
import subMenu from '../../../css/ui/subMenu.module.css';
import { AiFillHome } from "react-icons/ai";
import { BsBookFill, BsJournalBookmarkFill, BsSearch } from "react-icons/bs";
import { useState } from "react";

const GeneralComic = () => {
  const { useGetGeneralComic } = useGeneralComic();
  const { data: comics, isLoading } = useGetGeneralComic();

  let data = comics === undefined ? [{ length: 0 }] : comics.data;

  const [searchText, setSearchText] = useState('');

  const searchKeywords = searchText.trim().match(/[^\s]+/g);
  if (searchKeywords !== null) {
    data = comics.data.filter((comic) =>
      searchKeywords.every(
        (kw) => comic.attributes.title.indexOf(kw) !== -1
      )
    );
  }

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>/ 投稿一覧</span>
        </div>
      </div>
      <div className={generalComic.count}>【投稿数】 {comics.data.length}件</div>
      <div className={generalComic.search}>
        <span className={generalComic["bs-search"]}><BsSearch /></span>
        <input
          className={generalComic["search-text"]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={'漫画のタイトルを検索'}
        />
      </div>
      { data.length === 0 && (
        <div className={generalComic["detail-result"]}>検索結果がありません</div>
      ) }
      <div className={generalComic["main-content"]}>
        {data.map((comic) => (
          <div key={comic.id} className={generalComic.content}>
            <div className={generalComic["innner-content"]}>
              <div className={generalComic.list}>
                <div className={generalComic["user-name"]}><img className={generalComic["user-image"]} src={ comic.attributes.comicUserImage.url } alt='画像' onError={(e) => e.target.src = noimage} />{ comic.attributes.comicUserName }</div>
                <div className={generalComic["detail-area"]}>
                  <p className={generalComic.detail}><span className={generalComic["bs-book-fill"]}><BsBookFill /></span>【漫画名】</p>
                  <div>{ comic.attributes.title }</div>
                </div>
                <div className={generalComic["detail-area"]}>
                  <p className={generalComic.detail}><span className={generalComic["bs-journal-book-mark-fill"]}><BsJournalBookmarkFill /></span>【ジャンル】</p>
                  <div>{ comic.attributes.genre }</div>
                </div>
                <div className={generalComic["detail-area-link"]}>
                  <Link to={`/general_scene_post/${comic.attributes.title}/${comic.id}`} className={generalComic["link-show"]} >シーンを見る</Link>
                </div>
              </div>
              <div className={generalComic["outer-image"]}>
                <img className={generalComic.image} src={ comic.attributes.image.url } alt='画像' onError={(e) => e.target.src = noimage} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralComic;
