import React, { useContext } from 'react';
import header from '../css/header.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthGuard';

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useContext(AuthContext);

  return (
    <nav className={header.navbar}>
      <Link to='/' className={header.logo}>MangaBestGram</Link>
      <div className={header.list}>
        <ul className={header.ul}>
          <li className={header.li}>
            <button onClick={() => logout()} className={header["nav-li-text"]}>投稿一覧</button>
          </li>
          { isAuthenticated ?
          <li className={header.li}>
            <button onClick={() => logout()} className={header["nav-li-text"]}>ログアウト</button>
          </li>
          :
          <li className={header.li}>
            <button onClick={() => loginWithRedirect()} className={header["nav-li-text"]}>新規登録/ログイン</button>
          </li>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Header;
