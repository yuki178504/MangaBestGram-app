import { useScenePost } from '../../../hooks/useScenePost';
import ReactLoading from "react-loading";
import { Link, useParams } from 'react-router-dom';
import scenePost from '../../../css/model/scene_post/scenePost.module.css';
import { AiFillHome } from "react-icons/ai";
import { FcSearch, FcAddImage } from "react-icons/fc";
import { useMemo, useState } from 'react';
import ScenePostCard from './ui/ScenePostCard';
import { usePagination } from '../../../hooks/usePagination';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ScenePost = () => {
  const { comic_id, comic_title } = useParams();
  const { useGetScenePost } = useScenePost();

  const { data: scene_posts, isLoading } = useGetScenePost(comic_id);

  // ページネーション用
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  let data = scene_posts === undefined ? [{ length: 0 }] : scene_posts;

  const [searchText, setSearchText] = useState('');

  const searchKeywords = searchText.trim().match(/[^\s]+/g);
  if (searchKeywords !== null) {
    data = scene_posts.filter((scene_post) =>
      searchKeywords.every(
        (kw) => scene_post.sub_title.indexOf(kw) !== -1
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
    <div className={scenePost.wrapper}>
      <div className={scenePost["top-list"]}>
        <div className={scenePost.title}>
          <span className={scenePost.home}>
            <Link to='/' className={scenePost["home-link"]}><span className={scenePost["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={scenePost["home-link"]}><span>/&nbsp;マイページ</span></Link>
          </span>
          <span className={scenePost["comic-title"]}>
          /&nbsp;{ comic_title }のシーン一覧
          </span>
        </div>
      </div>
      <div className={scenePost.count}>【投稿数】&nbsp;{data.length}件</div>
      <div className={scenePost.sort}>
        <button className={sort.key === 'id' ? sort.order === 1 ? 'button active asc' : 'button active desc' : 'button'} onClick={() => handleSort('id')}>並び替え</button>
      </div>
      <div className={scenePost.search}>
        <span className={scenePost["fc-search"]}><FcSearch /></span>
        <input
          className={scenePost["search-text"]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={'サブタイトルを検索'}
        />
      </div>
      <button className={scenePost.link}>
        <Link to={`/comic/${comic_id}/${comic_title}/scene_post_new`}><span className={scenePost["react-icon"]}><FcAddImage /></span>新規のシーンを投稿する</Link>
      </button>
      { _DATA.currentData().length === 0 && (
        <div className={scenePost["detail-result"]}>検索結果がありません</div>
      ) }
      <div className={scenePost["main-content"]}>
        {_DATA.currentData().map((scene_post, index) => (
          <ScenePostCard
            key={index}
            scenePostId={scene_post.id}
            scenePostSubTitle={scene_post.sub_title}
            scenePostNumber={scene_post.scene_number}
            scenePostImage={scene_post.scene_image.url}
            scenePostCreatedAt={scene_post.created_at}
            comicTitle={comic_title}
            comicId={comic_id}
          />
          ))}
      </div>
      <div style={{textAlign: "center"}}>
        <Pagination
        className={scenePost.pagination}
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

export default ScenePost;
