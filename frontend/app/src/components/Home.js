import React from 'react';
import home from '../css/home.module.css'

const Home = () => {
  return (
    <div className={home["top-wrapper"]}>
  <div className={home["top-content"]}>
    <div className={home["top-title"]}>
      <div className={home["top-title-text"]}>あなたのお気に入りの場面を共有しよう！</div>
      <div className={home["top-post"]}>
        <div className={home["top-post-title"]}>
          <p to="" className={home["top-post-title-link"]}>最新の投稿</p>
        </div>
      </div>
    </div>
    <div className={home["top-search"]}>
      検索窓
    </div>
  </div>
</div>
  )
}

export default Home;