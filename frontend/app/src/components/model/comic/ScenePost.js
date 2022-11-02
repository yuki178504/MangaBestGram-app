import React from 'react';
import { useScenePost } from '../../../hooks/useScenePost';
import ReactLoading from "react-loading";
import { Link, useParams } from 'react-router-dom';
import scenePost from '../../../css/model/comic/scenePost.module.css';
import { AiFillHome } from "react-icons/ai";

const ScenePost = () => {
  const { comic_id, comic_title } = useParams();
  const { useGetScenePost } = useScenePost();

  const { data: scene_posts, isLoading } = useGetScenePost(comic_id);

  if(isLoading) return <ReactLoading type="spin" />
  console.log(scene_posts)

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
      <button className={scenePost.link}>
        <Link to={`/comic/${comic_id}/scene_post_new`} >新規のシーンを投稿する</Link>
      </button>
      <div className={scenePost["main-content"]}>
        {scene_posts?.map((scene_post) => (
          <div key={scene_post.id} className={scenePost.content}>
            <div className={scenePost["innner-content"]}>
              <div className={scenePost["outer-image"]}>
                <img className={scenePost.image} src='' alt='画像' />
              </div>
              <div className={scenePost.list}>
                <p className={scenePost["list-title"]}>{ scene_post.scene_title }</p>
                <p className={scenePost["list-genre"]}>{ scene_post.scene_content }</p>
              </div>
              <div className={scenePost["link-list"]}>
                <Link to={`/`} className={scenePost["link-show"]} >シーンを見る 追加する</Link>
                <Link to={`/`} className={scenePost["link-edit"]} >編集する</Link>
              </div>
            </div>
          </div>
          ))}
      </div>
    </div>
  )
}

export default ScenePost;
