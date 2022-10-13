import React, { useContext } from 'react';
import home from '../../css/home.module.css'
import { Link } from 'react-router-dom';
import { AuthContext } from "../../route/Routers";

const MyPageButton = () => {

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return (
      <div className={home["top-post-title"]}>
        <Link to="/mypage" className={home["top-post-title-link"]} >マイページ</Link>
      </div>
    )
  } else {
    return (
      <div className={home["top-post-title"]}>
        <Link to="" className={home["top-post-title-link"]}>最新の投稿</Link>
      </div>
    )
  }
}

export default MyPageButton;
