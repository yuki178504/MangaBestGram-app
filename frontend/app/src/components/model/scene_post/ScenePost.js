import { useScenePost } from '../../../hooks/useScenePost';
import ReactLoading from "react-loading";
import { Link, useParams } from 'react-router-dom';
import scenePost from '../../../css/model/scene_post/scenePost.module.css';
import { AiFillHome } from "react-icons/ai";
import noimage from "../../../image/default.png";
import { BsBookFill, BsJournalBookmarkFill, BsSearch, BsCalendar3 } from "react-icons/bs";
import { useMemo, useState } from 'react';
import moment from 'moment';

const ScenePost = () => {
  const { comic_id, comic_title } = useParams();
  const { useGetScenePost } = useScenePost();

  const { data: scene_posts, isLoading } = useGetScenePost(comic_id);

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
    <div className={scenePost.wrapper}>
      <div className={scenePost["top-list"]}>
        <div className={scenePost.title}>
          <span className={scenePost.home}>
            <Link to='/' className={scenePost["home-link"]}><span className={scenePost["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={scenePost["home-link"]}><span>/ マイページ</span></Link>
          </span>
          <span className={scenePost["comic-title"]}>
            / { comic_title }のシーン一覧
          </span>
        </div>
      </div>
      <div className={scenePost.count}>【投稿数】 {scene_posts.length}件</div>
      <div className={scenePost.sort}>
        <button className={sort.key === 'id' ? sort.order === 1 ? 'button active asc' : 'button active desc' : 'button'} onClick={() => handleSort('id')}>並び替え </button>
      </div>
      <div className={scenePost.search}>
        <span className={scenePost["bs-search"]}><BsSearch /></span>
        <input
          className={scenePost["search-text"]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={'サブタイトルを検索'}
        />
      </div>
      <button className={scenePost.link}>
        <Link to={`/comic/${comic_id}/${comic_title}/scene_post_new`}>新規のシーンを投稿する</Link>
      </button>
      { data.length === 0 && (
        <div className={scenePost["detail-result"]}>検索結果がありません</div>
      ) }
      <div className={scenePost["main-content"]}>
        {sortedData.map((scene_post) => (
          <div key={scene_post.id} className={scenePost.content}>
            <div className={scenePost["innner-content"]}>
              <div className={scenePost["outer-image"]}>
                <img className={scenePost.image} src={ scene_post.scene_image.url } alt='画像' onError={(e) => e.target.src = noimage} />
              </div>
              <div className={scenePost.list}>
                <div className={scenePost["detail-area"]}>
                    <p className={scenePost.detail}><span className={scenePost["bs-book-fill"]}><BsBookFill /></span>【サブタイトル】</p>
                    <div>{ scene_post.sub_title }</div>
                </div>
                <div className={scenePost["detail-area"]}>
                  <p className={scenePost.detail}><span className={scenePost["bs-journal-book-mark-fill"]}><BsJournalBookmarkFill /></span>【話数】</p>
                  <div>{ scene_post.scene_number }話</div>
                </div>
              </div>
              <div className={scenePost["link-list"]}>
                <Link to={`/scene_post/${comic_title}/${scene_post.id}`} className={scenePost["link-show"]} >シーンを見る</Link>
                <Link to={`/scene_post/${comic_id}/${comic_title}/${scene_post.id}/scene_post_edit`} className={scenePost["link-edit"]} >編集する</Link>
              </div>
              <div className={scenePost["create-at"]}><span className={scenePost["detail-text"]}><span className={scenePost["bs-calender-3"]}><BsCalendar3 /></span>{ moment(scene_post.created_at).format('YYYY年MM月DD日HH:mm') }</span></div>
            </div>
          </div>
          ))}
      </div>
    </div>
  );
};

export default ScenePost;
