import React from 'react';
import home from '../css/home.module.css'
import MyPageButton from './ui/MyPageButton';

const Home = () => {
  return (
    <div className={home.wrapper}>
  <div className={home.content}>
    <div className={home.title}>
      <div className={home["title-text"]}>あなたのお気に入りの場面を共有しよう！</div>
      <div className={home.post}>
        <MyPageButton />
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
