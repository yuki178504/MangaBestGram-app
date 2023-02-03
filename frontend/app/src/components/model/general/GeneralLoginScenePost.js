import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import { useMemo, useState } from "react";
import { FcSearch } from "react-icons/fc";
import GeneralLoginScenePostCard from "./ui/GeneralLoginScenePostCard";
import generalScenePost from '../../../css/model/general/generalScenePost.module.css';
import subMenu from '../../../css/ui/subMenu.module.css';

const GeneralLoginScenePost = () => {
  const { comic_id, comic_title } = useParams();
  const { useGetLoginGeneralScenePost } = useGeneralScenePost();

  const { data: scene_posts, isLoading } = useGetLoginGeneralScenePost(comic_id);

  let data = scene_posts === undefined ? [{ length: 0 }] : scene_posts.data;

  const [searchText, setSearchText] = useState('');

  const searchKeywords = searchText.trim().match(/[^\s]+/g);
  if (searchKeywords !== null) {
    data = scene_posts.data.filter((scene_post) =>
      searchKeywords.every(
        (kw) => scene_post.attributes.sub_title.indexOf(kw) !== -1
      )
    );
  };

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
        <button className={sort.key === 'id' ? sort.order === 1 ? 'button active asc' : 'button active desc' : 'button'} onClick={() => handleSort('id')}>並び替え</button>
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
      { data.length === 0 && (
        <div className={generalScenePost["detail-result"]}>検索結果がありません</div>
      ) }
      <div className={generalScenePost["main-content"]}>
        {sortedData.map((scene_post, index) => (
          <GeneralLoginScenePostCard
            key={index}
            scenePostId={scene_post.id}
            scenePostSubTitle={scene_post.attributes.sub_title}
            scenePostUserImage={scene_post.attributes.scene_post_user_image.url}
            scenePostUserName={scene_post.attributes.scene_post_user_name}
            scenePostNumber={scene_post.attributes.scene_number}
            scenePostImage={scene_post.attributes.scene_image.url}
            scenePostCreatedAt={scene_post.attributes.created_at}
            favorite={scene_post.attributes.favorite}
            comicTitle={comic_title}
            comicId={scene_post.attributes.comicId}
            userId={scene_post.attributes.user_id}
          />
        ))}
      </div>
    </div>
  );
};

export default GeneralLoginScenePost;
