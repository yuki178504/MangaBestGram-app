import { useParams, Link } from "react-router-dom";
import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import generalScenePost from '../../../css/model/general/generalScenePost.module.css';
import subMenu from '../../../css/ui/subMenu.module.css';
import { AiFillHome } from "react-icons/ai";
import GeneralScenePostCard from "./ui/GeneralScenePostCard";
import { useMemo, useState } from "react";
import { FcSearch } from "react-icons/fc";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { usePagination } from "../../../hooks/usePagination";

const GeneralScenePost = () => {
  const { comic_id, comic_title } = useParams();
  const { useGetGeneralScenePost } = useGeneralScenePost();

  const { data: scene_posts, isLoading } = useGetGeneralScenePost(comic_id);

  // ページネーション用
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  let data = scene_posts === undefined ? [{ length: 0 }] : scene_posts.data;

  const [searchText, setSearchText] = useState('');

  // 検索用関数
  const searchKeywords = searchText.trim().match(/[^\s]+/g);
  if (searchKeywords !== null) {
    data = scene_posts.data.filter((scene_post) =>
      searchKeywords.every(
        (kw) => scene_post.attributes.subTitle.indexOf(kw) !== -1
      )
    );
  };

  const [ sort, setSort ] = useState({});

  // 並び替え用関数
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
        if (a < b) {
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
          <span className={subMenu["comic-title"]}>
          /&nbsp;{ comic_title }のシーン一覧
          </span>
        </div>
      </div>
      <div className={generalScenePost.count}>【投稿数】&nbsp;{scene_posts.data.length}件</div>
      <div className={generalScenePost.sort}>
        <button className={sort.key === 'id' ? sort.order === 1 ? 'button active asc' : 'button active desc' : 'button'} onClick={() => handleSort('id')}>並び替え </button>
      </div>
      <div className={generalScenePost.search}>
        <span className={generalScenePost["fc-search"]}><FcSearch /></span>
        <input
          className={generalScenePost["search-text"]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={'サブタイトルを検索'}
        />
      </div>
      { _DATA.currentData().length === 0 && (
        <div className={generalScenePost["detail-result"]}>検索結果がありません</div>
      ) }
      <div className={generalScenePost["main-content"]}>
        {_DATA.currentData().map((scene_post, index) => (
          <GeneralScenePostCard
            key={index}
            scenePostId={scene_post.id}
            scenePostSubTitle={scene_post.attributes.subTitle}
            scenePostUserImage={scene_post.attributes.scenePostUserImage.url}
            scenePostUserName={scene_post.attributes.scenePostUserName}
            scenePostNumber={scene_post.attributes.sceneNumber}
            scenePostImage={scene_post.attributes.sceneImage.url}
            scenePostCreatedAt={scene_post.attributes.createdAt}
            favorite={scene_post.attributes.favorite}
            comicTitle={comic_title}
            userId={scene_post.attributes.userId}
          />
        ))}
      </div>
      <div style={{textAlign: "center"}}>
        <Pagination
        className={generalScenePost.pagination}
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

export default GeneralScenePost;
