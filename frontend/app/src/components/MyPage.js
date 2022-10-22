import React, { useState } from "react";
import mypage from "../css/mypage.module.css"
import { AiFillHome, AiFillEdit, AiFillHeart, AiFillFileText, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ComicPost from "./model/mypage/ComicPost";
import Profile from "./model/mypage/Profile";
import ComicNew from "./model/mypage/ComicNew";

const MyPage = () => {
  const [tabIndex, setTabIndex] = useState(2);

  return (
    <div className={mypage.wrapper}>
      <div className={mypage.content}>
        <div className={mypage.title}><span className={mypage.home}><Link to='/' className={mypage["home-link"]}><span className={mypage["react-icons"]}><AiFillHome /></span>ホーム</Link></span> / マイページ</div>
      </div>
      <div className={mypage.menu}>
        <Tabs selectedIndex={tabIndex} onSelect={ (index) => setTabIndex(index) }>
          <TabList>
            <ul className={mypage["menu-list"]}>
              <Tab>
                <ul className={mypage["menu-list-in"]}>
                  <li>新規投稿</li>
                  <li className={mypage["menu-icon"]}><AiFillEdit /></li>
                </ul>
              </Tab>
              <Tab>
                <ul className={mypage["menu-list-in"]}>
                  <li>お気に入り</li>
                  <li className={mypage["menu-icon"]}><AiFillHeart /></li>
                </ul>
              </Tab>
              <Tab>
                <ul className={mypage["menu-list-in"]}>
                  <li>投稿一覧</li>
                  <li className={mypage["menu-icon"]}><AiFillFileText /></li>
                </ul>
              </Tab>
              <Tab>
                <ul className={mypage["menu-list-in-end"]}>
                  <li>プロフィール</li>
                  <li className={mypage["menu-icon"]}><AiOutlineUser /></li>
                </ul>
              </Tab>
            </ul>
          </TabList>

          <TabPanel>
            <ComicNew />
          </TabPanel>
          <TabPanel>
            <div>お気に入りです</div>
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
  )
}

export default MyPage;
