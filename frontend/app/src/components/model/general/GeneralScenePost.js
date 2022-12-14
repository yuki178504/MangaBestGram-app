import { useParams, Link } from "react-router-dom";
import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import generalScenePost from '../../../css/model/general/generalScenePost.module.css';
import subMenu from '../../../css/ui/subMenu.module.css';
import { AiFillHome } from "react-icons/ai";
import GeneralScenePostCard from "./ui/GeneralScenePostCard";
import { AuthContext } from "../../../providers/AuthGuard";
import { useContext, useMemo, useState } from "react";
import { FcSearch } from "react-icons/fc";

const GeneralScenePost = () => {
  const { comic_id, comic_title } = useParams();
  const { useGetGeneralScenePost, useGetLoginGeneralScenePost } = useGeneralScenePost();
  const { isAuthenticated } = useContext(AuthContext);

  const { data: scene_posts, isLoading } = useGetGeneralScenePost(comic_id);
  const { data: general_scene_posts, isLoading: general_loading } = useGetLoginGeneralScenePost(comic_id);

  let generalData = scene_posts === undefined ? [{ length: 0 }] : scene_posts.data;
  let data = general_scene_posts === undefined ? [{ length: 0 }] : general_scene_posts.data;

  const [searchText, setSearchText] = useState('');
  const [searchGeneralText, setSearchGeneralText] = useState('');

  const searchKeywords = searchText.trim().match(/[^\s]+/g);
  if (searchKeywords !== null) {
    data = general_scene_posts.data.filter((general_scene_post) =>
      searchKeywords.every(
        (kw) => general_scene_post.attributes.sub_title.indexOf(kw) !== -1
      )
    );
  }

  const searchGeneralKeywords = searchGeneralText.trim().match(/[^\s]+/g);
  if (searchGeneralKeywords !== null) {
    generalData = scene_posts.data.filter((scene_post) =>
      searchGeneralKeywords.every(
        (kw) => scene_post.attributes.subTitle.indexOf(kw) !== -1
      )
    );
  }

  const [ sort, setSort ] = useState({});
  const [ generalSort, setGeneralSort ] = useState({});

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

  const sortedGeneralData = useMemo(() => {
    let _sortedGeneralData = generalData;
    if (generalSort.key) {
      _sortedGeneralData = _sortedGeneralData.sort((a, b) => {
        a = a[generalSort.key];
        b = b[generalSort.key];

        if (a === b) {
          return 0;
        }
        if (a > b) {
          return 1 * generalSort.order;
        }
        if (a < b) {
          return -1 * generalSort.order;
        }
      });
    }
    return _sortedGeneralData;
  }, [generalSort, generalData]);

  const handleGeneralSort = (key) => {
    if (generalSort.key === key) {
      setGeneralSort({...generalSort, order: -generalSort.order});
    } else {
      setGeneralSort({
        key: key,
        order: 1
      })
    } 
  };

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  if(general_loading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>?????????</Link>
          </span>
          <span className={subMenu["comic-title"]}>
          /&nbsp;{ comic_title }??????????????????
          </span>
        </div>
      </div>
      <div className={generalScenePost.count}>???????????????&nbsp;{scene_posts.data.length}???</div>
      {isAuthenticated ? (
        <>
          <div className={generalScenePost.sort}>
            <button className={sort.key === 'id' ? sort.order === 1 ? 'button active asc' : 'button active desc' : 'button'} onClick={() => handleSort('id')}>????????????</button>
          </div>
          <div className={generalScenePost.search}>
            <span className={generalScenePost["fc-search"]}><FcSearch /></span>
            <input
              className={generalScenePost["search-text"]}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={'???????????????????????????'}
            />
          </div>
          { data.length === 0 && (
            <div className={generalScenePost["detail-result"]}>??????????????????????????????</div>
          ) }
          <div className={generalScenePost["main-content"]}>
            {sortedData.map((scene_post, index) => (
              <GeneralScenePostCard
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
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={generalScenePost.sort}>
            <button className={generalSort.key === 'id' ? generalSort.order === 1 ? 'button active asc' : 'button active desc' : 'button'} onClick={() => handleGeneralSort('id')}>???????????? </button>
          </div>
          <div className={generalScenePost.search}>
            <span className={generalScenePost["fc-search"]}><FcSearch /></span>
            <input
              className={generalScenePost["search-text"]}
              value={searchGeneralText}
              onChange={(e) => setSearchGeneralText(e.target.value)}
              placeholder={'???????????????????????????'}
            />
          </div>
          { generalData.length === 0 && (
            <div className={generalScenePost["detail-result"]}>??????????????????????????????</div>
          ) }
          <div className={generalScenePost["main-content"]}>
            {sortedGeneralData.map((scene_post, index) => (
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
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GeneralScenePost;
