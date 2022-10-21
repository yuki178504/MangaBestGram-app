import React, { useContext } from 'react';
import home from '../../css/home.module.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthGuard';

const MyPageButton = () => {

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return (
      <div className={home["post-title"]}>
        <Link to="/mypage" className={home["post-title-link"]} >マイページ</Link>
      </div>
    )
  } else {
    return (
      <div className={home["post-title"]}>
        <Link to="" className={home["post-title-link"]}>最新の投稿</Link>
      </div>
    )
  }
}

export default MyPageButton;
