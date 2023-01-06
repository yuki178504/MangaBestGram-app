import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PasswordChange from './PasswordChange';
import ProfileEdit from './ProfileEdit';
import subMenu from "../../../css/ui/subMenu.module.css";
import mypage from "../../../css/mypage.module.css";
import { AiFillHome } from "react-icons/ai";
import { FcVoicePresentation, FcUnlock, FcKindle } from "react-icons/fc";
import EmailChange from './EmailChange';

const MyProfile = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const color = { background: '#ffc0cb' };

  return (
    <div className={mypage.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={subMenu["home-link"]}><span>&nbsp;/&nbsp;マイページ</span></Link>
          </span>
          <span>&nbsp;/&nbsp;プロフィール編集</span>
        </div>
      </div>
      <div className={mypage.menu}>
        <Tabs selectedIndex={tabIndex} onSelect={ (index) => setTabIndex(index) }>
          <TabList className={mypage["menu-list"]}>
            <Tab style={ tabIndex === 0 ? color : null } className={mypage["menu-list-in"]}>
              <div>プロフィール情報</div>
              <div className={mypage["menu-icon"]}><FcVoicePresentation /></div>
            </Tab>
            <Tab style={ tabIndex === 1 ? color : null } className={mypage["menu-list-in"]}>
              <div>パスワード変更</div>
              <div className={mypage["menu-icon"]}><FcUnlock /></div>
            </Tab>
            <Tab style={ tabIndex === 2 ? color : null } className={mypage["menu-list-in"]}>
              <div>メールアドレス変更</div>
              <div className={mypage["menu-icon"]}><FcKindle /></div>
            </Tab>
          </TabList>

          <TabPanel>
            <ProfileEdit />
          </TabPanel>
          <TabPanel>
            <PasswordChange />
          </TabPanel>
          <TabPanel>
            <EmailChange />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MyProfile;
