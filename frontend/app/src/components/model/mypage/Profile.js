import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthGuard';
import profile from '../../../css/model/profile.module.css';
import { Link } from 'react-router-dom';
import reactStringReplace from "react-string-replace";
//import { getList } from '../../../api/auth';

const Profile = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [dataList, setDataList] = useState([]);
  const regExp = /(https?:\/\/\S+)/g;

  useEffect(() => {
    console.log(user)
  }, []);

  // const handleGetList = async () => {
  //   try {
  //     const res = await getList();
  //     console.log(res.data);
  //     setDataList(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div className={profile.wrapper}>
      <div className={profile.content}>
        <div className={profile.name}>{ user.name }</div>
        <div className={profile.image}><img src={user.picture} /></div>
        <div className={profile.introduction}>自己紹介</div>
        <div className={profile.url}>
          
        </div>
        <div className={profile.edit}>
          <button className={profile.button}><Link to={`/`}>プロフィールを編集する</Link></button>
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
