import { useParams, Link } from "react-router-dom";
import { useGeneralScenePost } from "../../../hooks/useGeneralScenePost";
import ReactLoading from "react-loading";
import generalScenePostCss from '../../../css/model/general/generalScenePostCss.module.css';
import subMenu from '../../../css/ui/subMenu.module.css';
import { AiFillHome } from "react-icons/ai";
import GeneralScenePostCard from "./ui/GeneralScenePostCard";
import { AuthContext } from "../../../providers/AuthGuard";
import { useContext, useState } from "react";
import { BsSearch } from "react-icons/bs";

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

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  if(general_loading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span className={subMenu["comic-title"]}>
            / { comic_title }のシーン一覧
          </span>
        </div>
      </div>
      <div className={generalScenePostCss.count}>【投稿数】 {scene_posts.data.length}件</div>
      {isAuthenticated ? (
        <>
          <div className={generalScenePostCss.search}>
            <span className={generalScenePostCss["bs-search"]}><BsSearch /></span>
            <input
              className={generalScenePostCss["search-text"]}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={'サブタイトルを検索'}
            />
          </div>
          { data.length === 0 && (
            <div className={generalScenePostCss["detail-result"]}>検索結果がありません</div>
          ) }
          <div className={generalScenePostCss["main-content"]}>
            {data.map((scene_post, index) => (
              <GeneralScenePostCard
                key={index}
                scenePostId={scene_post.id}
                scenePostSubTitle={scene_post.attributes.sub_title}
                scenePostUserImage={scene_post.attributes.scene_post_user_image.url}
                scenePostUserName={scene_post.attributes.scene_post_user_name}
                scenePostNumber={scene_post.attributes.scene_number}
                scenePostImage={scene_post.attributes.scene_image.url}
                favorite={scene_post.attributes.favorite}
                comicTitle={comic_title}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={generalScenePostCss.search}>
            <span className={generalScenePostCss["bs-search"]}><BsSearch /></span>
            <input
              className={generalScenePostCss["search-text"]}
              value={searchGeneralText}
              onChange={(e) => setSearchGeneralText(e.target.value)}
              placeholder={'サブタイトルを検索'}
            />
          </div>
          { generalData.length === 0 && (
            <div className={generalScenePostCss["detail-result"]}>検索結果がありません</div>
          ) }
          <div className={generalScenePostCss["main-content"]}>
            {generalData.map((scene_post, index) => (
              <GeneralScenePostCard
                key={index}
                scenePostId={scene_post.id}
                scenePostSubTitle={scene_post.attributes.subTitle}
                scenePostUserImage={scene_post.attributes.scenePostUserImage.url}
                scenePostUserName={scene_post.attributes.scenePostUserName}
                scenePostNumber={scene_post.attributes.sceneNumber}
                scenePostImage={scene_post.attributes.sceneImage.url}
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
