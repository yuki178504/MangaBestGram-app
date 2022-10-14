import React from "react";
import mypage from "../css/mypage.module.css"
import { AiFillHome, AiFillEdit, AiFillHeart, AiFillFileText, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const MyPage = () => {
  return (
    <div className={mypage.wrapper}>
      <div className={mypage.content}>
        <div className={mypage.title}><span className={mypage.home}><Link to='/' className={mypage["home-link"]}><span className={mypage["react-icons"]}><AiFillHome /></span>ホーム</Link></span> / マイページ</div>
      </div>
      <div className={mypage.menu}>
        <ul className={mypage["menu-list"]}>
          <ul className={mypage["menu-list-in"]}>
            <li>新規投稿</li>
            <li className={mypage["menu-icon"]}><AiFillEdit /></li>
          </ul>
          <ul className={mypage["menu-list-in"]}>
            <li>お気に入り</li>
            <li className={mypage["menu-icon"]}><AiFillHeart /></li>
          </ul>
          <ul className={mypage["menu-list-in"]}>
            <li>投稿一覧</li>
            <li className={mypage["menu-icon"]}><AiFillFileText /></li>
          </ul>
          <ul className={mypage["menu-list-in-end"]}>
            <li>プロフィール</li>
            <li className={mypage["menu-icon"]}><AiOutlineUser /></li>
          </ul>
        </ul>
      </div>
    </div>
  )
}

export default MyPage;
