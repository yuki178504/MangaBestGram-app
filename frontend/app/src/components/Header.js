import React from 'react';
import header from '../css/header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return <nav className={header["navbar"]}>
  <h4 className={header["navbar-logo"]}>
    <p><Link to='/' className={header["navbar-logo"]}>MangaBestGram</Link></p>
  </h4>
  <div className={header["nav-list"]}>
    <ul className={header["nav-ul"]}>
      <li className={header["nav-li"]}>
        <p to="/posts" className={header["nav-li-text"]}>新規投稿</p>
      </li>
      <li className={header["nav-li"]}>
        <p to="/" className={header["nav-li-text"]}>ホーム</p>
      </li>
      <li className={header["nav-li"]}>
        <p to="/lists" className={header["nav-li-text"]}>投稿一覧</p>
      </li>
    </ul>
  </div>
</nav>
};

export default Header;
