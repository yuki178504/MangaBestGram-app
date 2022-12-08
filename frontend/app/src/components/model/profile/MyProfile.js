import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PasswordChange from './PasswordChange';
import ProfileEdit from './ProfileEdit';
import subMenu from "../../../css/ui/subMenu.module.css";
import mypage from "../../../css/mypage.module.css";
import { AiFillHome, AiOutlineUser, AiFillUnlock } from "react-icons/ai";

const MyProfile = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const color = { color: 'red' }

  return (
    <div className={mypage.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={subMenu["home-link"]}><span> / マイページ</span></Link>
          </span>
          <span> / プロフィール編集</span>
        </div>
      </div>
      <div className={mypage.menu}>
        <Tabs selectedIndex={tabIndex} onSelect={ (index) => setTabIndex(index) }>
          <TabList className={mypage["menu-list"]}>
            <Tab style={ tabIndex === 0 ? color : null } className={mypage["menu-list-in"]}>
              <div>プロフィール情報</div>
              <div className={mypage["menu-icon"]}><AiOutlineUser /></div>
            </Tab>
            <Tab style={ tabIndex === 1 ? color : null } className={mypage["menu-list-in"]}>
              <div>パスワード変更</div>
              <div className={mypage["menu-icon"]}><AiFillUnlock /></div>
            </Tab>
          </TabList>

          <TabPanel>
            <ProfileEdit />
          </TabPanel>
          <TabPanel>
            <PasswordChange />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MyProfile;