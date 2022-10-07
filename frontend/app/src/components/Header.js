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
        <p to="" className={header["nav-li-text"]}>ゲストログイン</p>
      </li>
      <li className={header["nav-li"]}>
        <p to="" className={header["nav-li-text"]}>新規登録</p>
      </li>
      <li className={header["nav-li"]}>
        <Link to="/signin" className={header["nav-li-text"]}>ログイン</Link>
      </li>
    </ul>
  </div>
</nav>
};

export default Header;
