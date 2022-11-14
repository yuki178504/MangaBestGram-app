import profile from '../../../css/model/profile.module.css';
import { Link } from 'react-router-dom';
import reactStringReplace from "react-string-replace";
import { useUser } from '../../../hooks/useUser';
import ReactLoading from "react-loading";
import noimage from "../../../image/default.png";

const Profile = () => {
  const { useGetUser } = useUser();
  const { data: user, isLoading } = useGetUser();
  const regExp = /(https?:\/\/\S+)/g;

  if(isLoading) return <ReactLoading type="spin" color='blue' />
  console.log(user)

  return (
    <div className={profile.wrapper}>
      <div className={profile.section}>
        <div className={profile.content}>
          <div className={profile['detail-area']}>
            <h3 className={profile.detail}>プロフィール</h3>
          </div>
          <div className={profile['detail-area']}>
            <p className={profile.detail}>【ユーザー名】</p>
            <div>{ user.name }</div>
          </div>
          <div className={profile['outer-image']}>
            <img className={profile.image} src={user.image.url} alt='画像' onError={(e) => e.target.src = noimage} />
          </div>
          <div className={profile['detail-area']}>
            <p className={profile.detail}>【自己紹介】</p>
            <div>{ user.introduction }</div>
          </div>
          <div className={profile['detail-area-last']}>
            <p className={profile.detail}>【webサイトリンク】</p>
            {reactStringReplace(user.url, regExp, (match, i) => (
              <a className={profile.a} key={i} href={match}>{match}</a>
            ))}
          </div>
          <div className={profile['detail-area']}>
            <Link to={`/profile_edit/${user.id}`} className={profile.button}>プロフィールを編集する</Link>
          </div>
          <ul className={profile.list}>
            <ul className={profile.posts}>
              <li>【投稿数】</li>
              <li>0</li>
            </ul>
            <ul className={profile.posts}>
              <li>【お気に入り数】</li>
              <li>0</li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
