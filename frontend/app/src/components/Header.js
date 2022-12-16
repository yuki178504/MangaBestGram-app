import { useContext } from 'react';
import header from '../css/header.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthGuard';
import { FcVoicePresentation, FcClapperboard, FcImport, FcHome } from "react-icons/fc";

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useContext(AuthContext);

  return (
    <nav className={header.navbar}>
      <Link to='/' className={header.logo}>MangaBestGram</Link>
      <div className={header.list}>
        <ul className={header.ul}>
          <li className={header.li}>
            <Link to='/users'><button className={header["nav-li-text"]}><span className={header["react-icon"]}><FcVoicePresentation /></span>ユーザー一覧</button></Link>
          </li>
          <li className={header.li}>
            <Link to='/comic'><button className={header["nav-comic"]}><span className={header["react-icon"]}><FcClapperboard /></span>漫画一覧</button></Link>
          </li>
            { isAuthenticated ?
              <li className={header.li}>
                <button onClick={() => logout({ returnTo: window.location.origin })} className={header["nav-sign-in"]}><span className={header["react-icon"]}><FcImport /></span>ログアウト</button>
              </li>
              :
              <li className={header.li}>
                <button onClick={() => loginWithRedirect({ redirect_url: window.location.origin })} className={header["nav-sign-in"]}><span className={header["react-icon"]}><FcHome /></span>新規登録/ログイン</button>
              </li>
            }
        </ul>
      </div>
    </nav>
  );
};

export default Header;
