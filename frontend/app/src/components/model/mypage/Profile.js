import profile from '../../../css/model/profile.module.css';
import { Link } from 'react-router-dom';
import reactStringReplace from "react-string-replace";
import { useUser } from '../../../hooks/useUser';
import ReactLoading from "react-loading";
import noimage from "../../../image/default.png";

const Profile = () => {
  const { useGetUser } = useUser();
  const { data: users, isLoading } = useGetUser();
  const regExp = /(https?:\/\/\S+)/g;

  if(isLoading) return <ReactLoading type="spin" color='blue' />
  console.log(users)

  return (
    <div className={profile.wrapper}>
      <div className={profile.content}>
          <div>
          <div className={profile.name}></div>
          <div className={profile.image}><img src={users.image.url} alt='画像' onError={(e) => e.target.src = noimage} /></div>
          <div className={profile.introduction}>自己紹介</div>
          <div className={profile.url}>
          </div>
          <div className={profile.edit}>
            <button className={profile.button}><Link to={`/profile_edit/${users.id}`}>プロフィールを編集する</Link></button>
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
    </div>
  );
};

export default Profile;
