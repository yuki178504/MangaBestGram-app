import React, { useContext } from 'react';
import home from '../css/home.module.css'
import { AuthContext } from '../providers/AuthGuard';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className={home.wrapper}>
  <div className={home.content}>
    <div className={home.title}>
      <div className={home["title-text"]}>あなたのお気に入りの場面を共有しよう！</div>
      <div className={home.post}>
      {
        isAuthenticated ?
        <div className={home["post-title"]}>
          <Link to="/mypage" className={home["post-title-link"]} >マイページ</Link>
        </div>
        :
        <div className={home["post-title"]}>
          <Link to="" className={home["post-title-link"]}>最新の投稿</Link>
        </div>
      }
      </div>
    </div>
    <div className={home.search}>
      検索窓
    </div>
  </div>
</div>
  )
}

export default Home;
