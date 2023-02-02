import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import '../../css/BurgerMenu.css';
import sideBar from '../../css/ui/sideBar.module.css';
import { AuthContext } from '../../providers/AuthGuard';
import { useContext, useState } from 'react';
import { FcPortraitMode, FcViewDetails, FcImport, FcHome, FcRight, FcVoicePresentation, FcReading, FcNook, FcFilm } from "react-icons/fc";

const BurgerMenu = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useContext(AuthContext);
  const [ open, setOpen ] = useState(false);

  const handleStateChange = state => {
    setOpen(state.isOpen)
  };

  const closeMenu = () => {
    setOpen(false)
  };

  return (
    <Menu isOpen={open} onStateChange={state => handleStateChange(state)} right customBurgerIcon={
      <div className={sideBar["menu-icon"]}><FcViewDetails /></div>
    }>
      <Link to="/" onClick={() => closeMenu()}><span className={sideBar["react-icon"]}><FcHome /></span>ホーム</Link>
      { isAuthenticated ?
        <Link to='/favorite_ranking' onClick={() => closeMenu()}><span className={sideBar["react-icon"]}><FcFilm /></span>人気ランキング</Link>
        :
        <Link to='/general_favorites_ranking' onClick={() => closeMenu()}><span className={sideBar["react-icon"]}><FcFilm /></span>人気ランキング</Link>
      }
      <Link to="/users" onClick={() => closeMenu()}><span className={sideBar["react-icon"]}><FcPortraitMode /></span>ユーザー一覧</Link>
      <Link to="/comic" onClick={() => closeMenu()}><span className={sideBar["react-icon"]}><FcReading /></span>漫画一覧</Link>
      { isAuthenticated ?
        <Link onClick={() => logout({ returnTo: window.location.origin })}><span className={sideBar["react-icon"]}><FcImport /></span>ログアウト</Link>
        :
        <Link onClick={() => loginWithRedirect({ redirect_url: window.location.origin })}><span className={sideBar["react-icon"]}><FcRight /></span>新規登録/ログイン</Link>
      }
      { isAuthenticated ?
        <Link to="/mypage" onClick={() => closeMenu()}><span className={sideBar["react-icon"]}><FcVoicePresentation /></span>マイページ</Link>
        :
        <Link onClick={() => loginWithRedirect({ redirect_url: window.location.origin })}><span className={sideBar["react-icon"]}><FcVoicePresentation /></span>マイページ</Link>
      }
      <Link to="/privacy-policy" onClick={() => closeMenu()}><span className={sideBar["react-icon"]}><FcNook /></span>プライバシーポリシー</Link>
      <Link to="/terms-of-service" onClick={() => closeMenu()}><span className={sideBar["react-icon"]}><FcNook /></span>利用規約</Link>
    </Menu>
  );
};

export default BurgerMenu;
