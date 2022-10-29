import React from 'react';
import { useScenePost } from '../../../hooks/useScenePost';
import ReactLoading from "react-loading";
import { Link, useParams } from 'react-router-dom';

const ScenePost = () => {
  const { comic_id } = useParams();
  const { useGetScenePost } = useScenePost();

  const { data: scene_posts, isLoading } = useGetScenePost(comic_id);

  if(isLoading) return <ReactLoading type="spin" />
  console.log(scene_posts)

  return (
    <>
      <div>シーンの画面一覧</div>
        {scene_posts?.map((scene_post) => (
            <div>{ scene_post.scene_title }</div>
            ))}
      <Link to={`/comic/${comic_id}/scene_post_new`} >新規のシーンを投稿する</Link>
    </>
  )
}

export default ScenePost;
