import { useState } from "react";
import mypage from "../css/mypage.module.css";
import { AiFillHome } from "react-icons/ai";
import { FcLike, FcClapperboard, FcVoicePresentation, FcAddImage } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ComicNew, ComicPost, Favorite, Profile } from "../route/Pages";

const MyPage = () => {
  const [tabIndex, setTabIndex] = useState(2);
  const color = { background: '#ffc0cb' }

  return (
    <div className={mypage.wrapper}>
      <div className={mypage.content}>
        <div className={mypage.title}><span className={mypage.home}><Link to='/' className={mypage["home-link"]}><span className={mypage["react-icons"]}><AiFillHome /></span>ホーム</Link></span> / マイページ</div>
      </div>
      <div className={mypage.menu}>
        <Tabs selectedIndex={tabIndex} onSelect={ (index) => setTabIndex(index) }>
          <TabList className={mypage["menu-list"]}>
            <Tab style={ tabIndex === 0 ? color : null } className={mypage["menu-list-in"]}>
              <div>新規投稿</div>
              <div className={mypage["menu-icon"]}><FcAddImage /></div>
            </Tab>
            <Tab style={ tabIndex === 1 ? color : null } className={mypage["menu-list-in"]}>
              <div>お気に入り</div>
              <div className={mypage["menu-icon"]}><FcLike /></div>
            </Tab>
            <Tab style={ tabIndex === 2 ? color : null } className={mypage["menu-list-in"]}>
              <div>投稿一覧</div>
              <div className={mypage["menu-icon"]}><FcClapperboard /></div>
            </Tab>
            <Tab style={ tabIndex === 3 ? color : null } className={mypage["menu-list-in"]}>
              <div>プロフィール</div>
              <div className={mypage["menu-icon"]}><FcVoicePresentation /></div>
            </Tab>
          </TabList>

          <TabPanel>
            <ComicNew />
          </TabPanel>
          <TabPanel>
            <Favorite />
          </TabPanel>
          <TabPanel>
            <ComicPost />
          </TabPanel>
          <TabPanel>
            <Profile />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MyPage;
