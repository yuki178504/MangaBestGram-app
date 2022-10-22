import React, { useContext, useEffect, useState } from 'react';
import { getComic } from '../../../api/comic';
import { AuthContext } from '../../../providers/AuthGuard';
import comicPost from '../../../css/model/comicPost.module.css'
import { Link } from 'react-router-dom';

const ComicPost = () => {
  const { token, getToken } = useContext(AuthContext);
  const [ comic, setComic ] = useState([]);

  useEffect(() => {
    handleGetComic();
  }, [getToken]);

  useEffect(() => {
    getToken();
  }, []);

  const handleGetComic = async () => {
    try {
      const res = await getComic({
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      setComic(res.data);
    } catch (e) {
      console.log(e);
    };
  };

  return (
    <div className={comicPost.wrapper}>
      <div className={comicPost["main-content"]}>
        { comic.map((item) => (
          <div className={comicPost.content}>
            <div className={comicPost["innner-content"]}>
              <div className={comicPost["outer-image"]}>
                <img className={comicPost.image} src='' alt='画像' />
              </div>
              <div className={comicPost.list}>
                <p className={comicPost["list-title"]}>{ item.title }</p>
                <p className={comicPost["list-genre"]}>{ item.genre }</p>
              </div>
              <div className={comicPost["link-list"]}>
              <Link to="/" className={comicPost["link-show"]} >シーンを見る 追加する</Link>
              <Link to="/" className={comicPost["link-edit"]} >編集する</Link>
              </div>
            </div>
          </div>
          )) }
      </div>
    </div>
  );
};

export default ComicPost;
