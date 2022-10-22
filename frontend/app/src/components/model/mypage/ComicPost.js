import React, { useContext, useEffect, useState } from 'react';
import { getComic } from '../../../api/comic';
import { AuthContext } from '../../../providers/AuthGuard';

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
    <div>
    <div>コミックの投稿一覧の画面</div>
    <div>
    { comic.map((item) => (
          <div>{item.title}</div>
      )) }
    </div>
    </div>
  );
};

export default ComicPost;
