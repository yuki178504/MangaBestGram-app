import { useGeneralComic } from "../../../hooks/useGeneralComic";
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import noimage from "../../../image/default.png";
import scenery from "../../../image/scenery.png";
import generalComic from "../../../css/model/general/generalComic.module.css";
import subMenu from '../../../css/ui/subMenu.module.css';
import { AiFillHome } from "react-icons/ai";
import { FcReading, FcFile, FcCalendar, FcMms, FcSearch } from "react-icons/fc";
import { useContext, useMemo, useState } from "react";
import moment from 'moment';
import { UserInformationName } from "../../ui/UserInformationDisplay";
import ScenePostCount from "../../ui/ScenePostCount";
import { AuthContext } from "../../../providers/AuthGuard";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const GeneralComic = () => {
  const { useGetGeneralComic } = useGeneralComic();
  const { data: comics, isLoading } = useGetGeneralComic();
  const { isAuthenticated } = useContext(AuthContext);

  // ページネーション用
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  let data = comics === undefined ? [{ length: 0 }] : comics.data;

  // 検索用
  const [searchText, setSearchText] = useState('');

  const searchKeywords = searchText.trim().match(/[^\s]+/g);
  if (searchKeywords !== null) {
    data = comics.data.filter((comic) =>
      searchKeywords.every(
        (kw) => comic.attributes.title.indexOf(kw) !== -1
      )
    );
  };

  // 並び替え用
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
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>/&nbsp;漫画一覧</span>
        </div>
      </div>
      <div className={generalComic.count}>【投稿数】&nbsp;{comics.data.length}件</div>
      <div className={generalComic.sort}>
        <button className={sort.key === 'id' ? sort.order === 1 ? 'button active asc' : 'button active desc' : 'button'} onClick={() => handleSort('id')}>並び替え </button>
      </div>
      <div className={generalComic.search}>
        <span className={generalComic["fc-search"]}><FcSearch /></span>
        <input
          className={generalComic["search-text"]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={'漫画のタイトルを検索'}
        />
      </div>
      { _DATA.currentData().length === 0 && (
        <div className={generalComic["detail-result"]}>検索結果がありません</div>
      ) }
      <div className={generalComic["main-content"]}>
        {_DATA.currentData().map((comic) => (
          <div key={comic.id} className={generalComic.content}>
            <div className={generalComic["innner-content"]}>
              <div className={generalComic.list}>
                <div className={generalComic["user-name"]}>
                  <Link to={`/users/${comic.attributes.userId}/comics`} >
                    <img className={generalComic["user-image"]} src={ comic.attributes.comicUserImage.url } alt='画像' onError={(e) => e.target.src = noimage} />
                  </Link>
                  <UserInformationName userName={comic.attributes.comicUserName} />
                  { comic.attributes.comicUserName }
                </div>
                <div className={generalComic["detail-area"]}>
                  <p className={generalComic.detail}><span className={generalComic["react-icon"]}><FcReading /></span>漫画名</p>
                  <div>{ comic.attributes.title }</div>
                </div>
                <div className={generalComic["detail-area"]}>
                  <p className={generalComic.detail}><span className={generalComic["react-icon"]}><FcFile /></span>ジャンル</p>
                  <div>{ comic.attributes.genre }</div>
                </div>
                { isAuthenticated ?
                  <div className={generalComic["detail-area-link"]}>
                    <Link to={`/general_login_scene_post/${comic.attributes.title}/${comic.id}`} className={generalComic["link-show"]} ><span className={generalComic["react-icon"]}><FcMms /></span>シーンを見る</Link>
                  </div>
                :
                  <div className={generalComic["detail-area-link"]}>
                    <Link to={`/general_scene_post/${comic.attributes.title}/${comic.id}`} className={generalComic["link-show"]} ><span className={generalComic["react-icon"]}><FcMms /></span>シーンを見る</Link>
                  </div>
                }
              </div>
              <div className={generalComic["outer-image"]}>
                <div className={generalComic["detail-area-image"]}>
                  <div className={generalComic["create-at"]}><span className={generalComic["detail-text"]}><span className={generalComic["react-icon"]}><FcCalendar /></span>{ moment(comic.attributes.createdAt).format('YYYY年MM月DD日HH:mm') }</span></div>
                  <img className={generalComic.image} src={ comic.attributes.image.url } alt='画像' onError={(e) => e.target.src = scenery} />
                  <div className={generalComic['detail-area-count']}>
                    <div className={generalComic['detail-area-list']}>
                      <ScenePostCount comicId={comic.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign: "center"}}>
        <Pagination
        className={generalComic.pagination}
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

export default GeneralComic;
