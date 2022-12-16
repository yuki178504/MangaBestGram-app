import { useMemo, useState } from 'react';
import comicPost from '../../../css/model/comicPost.module.css';
import { Link } from 'react-router-dom';
import { useComic } from '../../../hooks/useComic';
import ReactLoading from "react-loading";
import noimage from "../../../image/default.png";
import { FcReading, FcFile, FcCalendar, FcMms, FcSearch, FcEditImage } from "react-icons/fc";
import moment from 'moment';

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

  const [ sort, setSort ] = useState({});

  const sortedData = useMemo(() => {
    let _sortedData = data;
    if (sort.key) {
      _sortedData = _sortedData.sort((a, b) => {
        a = a[sort.key];
        b = b[sort.key];

        if (a === b) {
          return 0;
        }
        if (a > b) {
          return 1 * sort.order;
        }
        if (a < b) {
          return -1 * sort.order;
        }
      });
    }
    return _sortedData;
  }, [sort, data]);

  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({...sort, order: -sort.order});
    } else {
      setSort({
        key: key,
        order: 1
      })
    } 
  };

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={comicPost.wrapper}>
      <div className={comicPost.count}>【投稿数】 {comics.length}件</div>
      <button className={sort.key === 'updated_at' ? sort.order === 1 ? 'button active asc' : 'button active desc' : 'button'} onClick={() => handleSort('updated_at')}>並び替え </button>
      <div className={comicPost.search}>
        <span className={comicPost["fc-search"]}><FcSearch /></span>
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
        {sortedData.map((comic) => (
          <div key={comic.id} className={comicPost.content}>
            <div className={comicPost["innner-content"]}>
              <div className={comicPost["outer-image"]}>
                <img className={comicPost.image} src={ comic.image.url } alt='画像' onError={(e) => e.target.src = noimage} />
              </div>
              <div className={comicPost.list}>
                <div className={comicPost["detail-area"]}>
                  <p className={comicPost.detail}><span className={comicPost["react-icon"]}><FcReading /></span>漫画名</p>
                  <div>{ comic.title }</div>
                </div>
                <div className={comicPost["detail-area"]}>
                  <p className={comicPost.detail}><span className={comicPost["react-icon"]}><FcFile /></span>ジャンル</p>
                  <div>{ comic.genre }</div>
                </div>
              </div>
              <div className={comicPost["link-list"]}>
                <Link to={`/comic/${comic.id}/${comic.title}`} className={comicPost["link-show"]} ><span className={comicPost["react-icon"]}><FcMms /></span>シーンを見る/追加する</Link>
                <Link to={`/comic/${comic.id}/${comic.title}/comic_edit`} className={comicPost["link-edit"]} ><span className={comicPost["react-icon"]}><FcEditImage /></span>編集する</Link>
              </div>
              <div className={comicPost["create-at"]}><span className={comicPost["detail-text"]}><span className={comicPost["react-icon"]}><FcCalendar /></span>{ moment(comic.created_at).format('YYYY年MM月DD日HH:mm') }</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicPost;
