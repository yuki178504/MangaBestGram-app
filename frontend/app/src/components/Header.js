import React, { useContext } from 'react';
import header from '../css/header.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthGuard';

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useContext(AuthContext);

  return <nav className={header["navbar"]}>
  <h4 className={header["navbar-logo"]}>
    <p><Link to='/' className={header["navbar-logo"]}>MangaBestGram</Link></p>
  </h4>
  <div className={header["nav-list"]}>
    <ul className={header["nav-ul"]}>
      <li className={header["nav-li"]}>
        <Link to="/" className={header["nav-li-text"]}>ゲストログイン</Link>
      </li>
      <li className={header["nav-li"]}>
        <button onClick={() => loginWithRedirect()} className={header["nav-li-text"]}>新規登録</button>
      </li>
      <li className={header["nav-li"]}>
        <button onClick={() => loginWithRedirect()} className={header["nav-li-text"]}>ログイン</button>
      </li>
      <li className={header["nav-li"]}>
        <button onClick={() => logout()} className={header["nav-li-text"]}>ログアウト</button>
      {
        isAuthenticated ?
        <p>ログイン</p>
        :
        <p>ログアウト</p>
      }
      </li>
    </ul>
  </div>
</nav>
};

export default Header;
