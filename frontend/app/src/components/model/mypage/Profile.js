import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthGuard';
import profile from '../../../css/model/profile.module.css';
import { Link } from 'react-router-dom';
import reactStringReplace from "react-string-replace";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const regExp = /(https?:\/\/\S+)/g;

  return (
    <div className={profile.wrapper}>
      <div className={profile.content}>
        <div className={profile.name}>{currentUser.name}</div>
        <div className={profile.image}>プロフ画像</div>
        <div className={profile.introduction}>{currentUser.introduction}</div>
        <div className={profile.url}>
          {reactStringReplace(currentUser.url, regExp, (match, i) => (
            <a className={profile.a} key={i} href={match}>{match}</a>
          ))}
        </div>
        <div className={profile.edit}>
          <button className={profile.button}><Link to={`/edit/${currentUser.id}`}>プロフィールを編集する</Link></button>
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
