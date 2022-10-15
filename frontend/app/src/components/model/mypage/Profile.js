import React, { useContext } from 'react';
import { AuthContext } from '../../../route/Routers';
import profile from '../../../css/model/profile.module.css';
import { Link } from 'react-router-dom';
const Profile = () => {
  const { currentUser } = useContext(AuthContext);


  return (
    <div className={profile.wrapper}>
      <div className={profile.content}>
        <div className={profile.name}>{currentUser.name}</div>
        <div className={profile.image}>プロフ画像</div>
        <div className={profile.introduction}>自己紹介文</div>
        <div className={profile.edit}>
          <button className={profile.button}><Link to='/edit'>プロフィールを編集する</Link></button>
        </div>
      <ul className={profile.list}>
        <ul className={profile.posts}>
          <li>投稿数</li>
          <li>0</li>
        </ul>
        <ul className={profile.posts}>
          <li>お気に入り数</li>
          <li>0</li>
        </ul>
      </ul>
      </div>
    </div>
  )
}

export default Profile;
