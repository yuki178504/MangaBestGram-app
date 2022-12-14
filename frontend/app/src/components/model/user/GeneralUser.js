import { useGeneralUser } from "../../../hooks/useGeneralUser";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import subMenu from '../../../css/ui/subMenu.module.css';
import { AiFillHome } from "react-icons/ai";
import generalUser from "../../../css/model/user/generalUser.module.css";
import profile from '../../../css/model/profile.module.css';
import reactStringReplace from "react-string-replace";

const GeneralUser = () => {
  const { useGetGeneralUser } = useGeneralUser();
  const { data: users, isLoading } = useGetGeneralUser();
  const regExp = /(https?:\/\/\S+)/g;

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  console.log(users)

  return (
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>/ ユーザー一覧</span>
        </div>
      </div>
      <div className={generalUser["main-content"]}>
        {users.map((user) => (
          <div key={user.id} className={profile.section}>
            <div className={profile.content}>
              <div className={profile['detail-area']}>
                <h3 className={profile.detail}>プロフィール</h3>
              </div>
              <div className={profile['detail-area']}>
                <p className={profile.detail}>【ユーザー名】</p>
                <div>{ user.name }</div>
              </div>
              <div className={profile['outer-image']}>
                <img className={profile.image} src={ user.image.url } alt='画像' onError={(e) => e.target.src = noimage} />
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralUser;
