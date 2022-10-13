import React from 'react';
import home from '../css/home.module.css'
import MyPageButton from './ui/MyPageButton';

const Home = () => {
  return (
    <div className={home["top-wrapper"]}>
  <div className={home["top-content"]}>
    <div className={home["top-title"]}>
      <div className={home["top-title-text"]}>あなたのお気に入りの場面を共有しよう！</div>
      <div className={home["top-post"]}>
        <MyPageButton />
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
