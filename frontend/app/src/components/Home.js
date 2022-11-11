import React, { useContext } from 'react';
import home from '../css/home.module.css'
import { AuthContext } from '../providers/AuthGuard';
import { Link } from 'react-router-dom';
import comicPost from '../css/model/comicPost.module.css';
import { useGeneralComic } from '../hooks/useGeneralComic';
import ReactLoading from "react-loading";
import noimage from "../image/default.png"
import { Link as Scroll } from 'react-scroll';
import { BsChevronDoubleDown } from "react-icons/bs";

const Home = () => {
  const { useGetGeneralLatestComic } = useGeneralComic();
  const { data, isLoading } = useGetGeneralLatestComic();
  const { isAuthenticated, loginWithRedirect } = useContext(AuthContext);

  if(isLoading) return <ReactLoading type="spin" color='blue' />
  console.log(data)

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
              <button onClick={() => loginWithRedirect()} className={home["post-title-link"]}>ログイン/新規登録</button>
            </div>
          }
          </div>
        </div>
        <div className={home.desc}>
          <h4>MangaBestGramとは？</h4>
          <p className={home["desc-text"]}>自分が気に入った！感銘を受けた！などのマンガの名場面を記録できるサービスです！</p>
          <h4>あの場面を心だけでなく、記録としても残してみませんか？</h4>
        </div>
        <div className={home.scroll}>
          <Scroll className={home["scroll-text"]} to="scroll" smooth={true} duration={600}><span className={home["bs-chevron-double-down"]}><BsChevronDoubleDown /></span>最新の投稿を見てみる</Scroll>
        </div>
      </div>
      <div className={home.section}>
        <div className={home["section-outer-title"]}>
          <span id='scroll'></span>
          <h3 className={home["section-title"]}>最新の投稿</h3>
        </div>
        <div className={comicPost["main-content"]}>
          {data.map((comic) => (
            <div key={comic.id} className={comicPost.content}>
              <div className={comicPost["innner-content"]}>
                <div className={comicPost["outer-image"]}>
                  <img className={comicPost.image} src={ comic.image.url } alt='画像' onError={(e) => e.target.src = noimage} />
                </div>
                <div className={comicPost.list}>
                  <p className={comicPost["list-title"]}>【{ comic.title }】</p>
                  <p className={comicPost["list-genre"]}>【{ comic.genre }】</p>
                </div>
                <div className={comicPost["link-list"]}>
                  <Link to={`/scene_post/${comic.id}`} className={comicPost["link-show"]} >シーンを見る</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
