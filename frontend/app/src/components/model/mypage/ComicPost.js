import { useMemo, useState } from 'react';
import comicPost from '../../../css/model/comicPost.module.css';
import { Link } from 'react-router-dom';
import { useComic } from '../../../hooks/useComic';
import ReactLoading from "react-loading";
import scenery from "../../../image/scenery.png";
import { FcReading, FcFile, FcCalendar, FcMms, FcSearch, FcEditImage } from "react-icons/fc";
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { usePagination } from '../../../hooks/usePagination';

const ComicPost = () => {
  const { useGetComic } = useComic();
  const { data: comics, isLoading } = useGetComic();

  // ページネーション用
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

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
        if (a > b ? -1 : 1) {
          return 1 ? -1 : 1 * sort.order;
        }
        if (a < b ? -1 : 1) {
          return -1 ? -1 : 1 * sort.order;
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

  // ページネーション
  const count = Math.ceil(sortedData.length / PER_PAGE);
  const _DATA = usePagination(sortedData, PER_PAGE);
  const handleChange = (_e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={comicPost.wrapper}>
      <div className={comicPost.count}>【投稿数】&nbsp;{comics.length}件</div>
      <button className={sort.key === 'id' ? sort.order === 1 ? 'button active asc' : 'button active desc' : 'button'} onClick={() => handleSort('id')}>並び替え</button>
      <div className={comicPost.search}>
        <span className={comicPost["fc-search"]}><FcSearch /></span>
        <input
          className={comicPost["search-text"]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={'漫画のタイトルを検索'}
        />
      </div>
      { _DATA.currentData().length === 0 && (
        <div className={comicPost["detail-result"]}>検索結果がありません</div>
      ) }
      <div className={comicPost["main-content"]}>
        {_DATA.currentData().map((comic) => (
          <div key={comic.id} className={comicPost.content}>
            <div className={comicPost["innner-content"]}>
              <div className={comicPost["outer-image"]}>
                <img className={comicPost.image} src={ comic.image.url } alt='画像' onError={(e) => e.target.src = scenery} />
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
      <div style={{textAlign: "center"}}>
        <Pagination
        className={comicPost.pagination}
        count={count}
        page={page}
        renderItem={(item) => (
          <PaginationItem
            components={{
              previous: ArrowBackIcon,
              next: ArrowForwardIcon,
            }}
            {...item}
          />
        )}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ComicPost;
