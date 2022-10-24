import React, { useContext, useEffect, useState } from 'react';
import home from '../css/home.module.css'
import { AuthContext } from '../providers/AuthGuard';
import { Link } from 'react-router-dom';
import { getUserComic } from '../api/comic';
import comicPost from '../css/model/comicPost.module.css';

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useContext(AuthContext);
  const [ comics, setComics ] = useState([]);

  useEffect(() => {
    handleGetComic();
  }, []);

  const handleGetComic = async () => {
    try {
      const res = await getUserComic();
      console.log(res.data);
      setComics(res.data);
    } catch (e) {
      console.log(e);
    };
  };

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
        <div className={home.search}>
          検索窓
        </div>
        <div className={ home.desc }>
          <h4>MangaBestGramとは？</h4>
          <p>自分が気に入った！感銘を受けた！などのマンガの名場面を記録できるサービスです！</p>
        </div>
      </div>
      <div className={home.secction}>
        <div className={comicPost["main-content"]}>
          {comics.map((comic) => (
            <div className={comicPost.content}>
              <div className={comicPost["innner-content"]}>
                <div className={comicPost["outer-image"]}>
                  <img className={comicPost.image} src='' alt='画像' />
                </div>
                <div className={comicPost.list}>
                  <p className={comicPost["list-title"]}>{ comic.title }</p>
                  <p className={comicPost["list-genre"]}>{ comic.genre }</p>
                </div>
                <div className={comicPost["link-list"]}>
                  <Link to="/" className={comicPost["link-show"]} >シーンを見る</Link>
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
