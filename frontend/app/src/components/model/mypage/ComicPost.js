import comicPost from '../../../css/model/comicPost.module.css';
import { Link } from 'react-router-dom';
import { useComic } from '../../../hooks/useComic';
import ReactLoading from "react-loading";
import noimage from "../../../image/default.png";
import { BsBookFill, BsJournalBookmarkFill, BsSearch } from "react-icons/bs";
import { useState } from 'react';

const ComicPost = () => {
  const { useGetComic } = useComic();
  const { data: comics, isLoading } = useGetComic();

  let data = comics === undefined ? [{ length: 0 }] : comics;

  const [searchText, setSearchText] = useState('');

  const searchKeywords = searchText.trim().match(/[^\s]+/g);
  if (searchKeywords !== null) {
    data = comics.filter((comic) =>
      searchKeywords.every(
        (kw) => comic.title.indexOf(kw) !== -1
      )
    );
  }

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={comicPost.wrapper}>
      <div className={comicPost.count}>【投稿数】 : {comics.length}件</div>
      <div className={comicPost.search}>
        <span className={comicPost["bs-search"]}><BsSearch /></span>
        <input
          className={comicPost["search-text"]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={'漫画のタイトルを検索'}
        />
      </div>
      { data.length === 0 && (
        <div className={comicPost["detail-result"]}>検索結果がありません</div>
      ) }
      <div className={comicPost["main-content"]}>
        {data.map((comic) => (
          <div key={comic.id} className={comicPost.content}>
            <div className={comicPost["innner-content"]}>
              <div className={comicPost["outer-image"]}>
                <img className={comicPost.image} src={ comic.image.url } alt='画像' onError={(e) => e.target.src = noimage} />
              </div>
              <div className={comicPost.list}>
                <div className={comicPost["detail-area"]}>
                  <p className={comicPost.detail}><span className={comicPost["bs-book-fill"]}><BsBookFill /></span>【漫画名】</p>
                  <div>{ comic.title }</div>
                </div>
                <div className={comicPost["detail-area"]}>
                  <p className={comicPost.detail}><span className={comicPost["bs-journal-book-mark-fill"]}><BsJournalBookmarkFill /></span>【ジャンル】</p>
                  <div>{ comic.genre }</div>
                </div>
              </div>
              <div className={comicPost["link-list"]}>
                <Link to={`/comic/${comic.id}/${comic.title}`} className={comicPost["link-show"]} >シーンを見る/追加する</Link>
                <Link to={`/comic/${comic.id}/${comic.title}/comic_edit`} className={comicPost["link-edit"]} >編集する</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicPost;
