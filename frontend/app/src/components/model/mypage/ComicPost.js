import comicPost from '../../../css/model/comicPost.module.css';
import { Link } from 'react-router-dom';
import { useComicApi } from '../../../hooks/useComicApi';
import ReactLoading from "react-loading";
import noimage from "../../../image/default.png";
import { BsBookFill, BsJournalBookmarkFill } from "react-icons/bs";

const ComicPost = () => {
  const { useGetComic } = useComicApi();
  const { data: comics, isLoading } = useGetComic();

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={comicPost.wrapper}>
      <div className={comicPost.count}>【投稿数】 : {comics.length}件</div>
      <div className={comicPost["main-content"]}>
        {comics?.map((comic) => (
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
