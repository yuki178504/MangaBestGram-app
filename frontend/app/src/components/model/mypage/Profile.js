import { Link } from 'react-router-dom';
import reactStringReplace from "react-string-replace";
import { useUser } from '../../../hooks/useUser';
import ReactLoading from "react-loading";
import noimage from "../../../image/default.png";
import { useComic } from '../../../hooks/useComic';
import { useFavorite } from '../../../hooks/useFavorite';
import profile from '../../../css/model/profile.module.css';
import { FcPortraitMode, FcGraduationCap, FcImageFile, FcEditImage, FcLike, FcReading, FcFilm } from "react-icons/fc";
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthGuard';
import { UserInformationIntroduction, UserInformationName, UserInformationWebLink } from '../../ui/UserInformationDisplay';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { useGetUser } = useUser();
  const { useGetComic, useGetScenePostCount } = useComic();
  const { useGetFavorite } = useFavorite();

  const { data: favorites, isLoading: favoriteLoading } = useGetFavorite();
  const { data: comics, isLoading: comicLoading } = useGetComic();
  const { data: scenePostCounts, isLoading: scenePostCountsLoading } = useGetScenePostCount();
  const { data: users, isLoading } = useGetUser();
  const regExp = /(https?:\/\/\S+)/g;

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  if(favoriteLoading) return <></>
  if(comicLoading) return <></>
  if(scenePostCountsLoading) return <></>

  return (
    <div className={profile.wrapper}>
      <div className={profile.section}>
        <div className={profile.content}>
          <div className={profile['detail-area']}>
            <h3 className={profile["detail-profile"]}>【プロフィール】</h3>
          </div>
          <div className={profile['detail-area']}>
            <p className={profile.detail}><span className={profile["react-icon"]}><FcPortraitMode /></span>ユーザー名</p>
            <UserInformationName userName={users.name} />
            <div>{ users.name }</div>
          </div>
          <div className={profile['outer-image']}>
            <img className={profile.image} src={ users.image.url } alt='画像' onError={(e) => e.target.src = noimage} />
          </div>
          <div className={profile['detail-area']}>
            <p className={profile.detail}><span className={profile["react-icon"]}><FcGraduationCap /></span>自己紹介</p>
            <UserInformationIntroduction userIntroduction={users.introduction} />
            <div>{ users.introduction }</div>
          </div>
          <div className={profile['detail-area-last']}>
            <p className={profile.detail}><span className={profile["react-icon"]}><FcImageFile /></span>webサイトリンク</p>
            <UserInformationWebLink userUrl={users.url} />
            {reactStringReplace(users.url, regExp, (match, i) => (
              <a className={profile.a} key={i} href={match}>{match}</a>
            ))}
          </div>
          {"example@example.com" != user.email && (
            <div className={profile['detail-area']}>
              <Link to={`/my-profile/${users.id}`} className={profile.button}><span className={profile["react-icon"]}><FcEditImage /></span>プロフィールを編集する</Link>
            </div>
          ) }
          <div className={profile['detail-area-count']}>
            <div className={profile.list}>
              <p className={profile['detail-list']}><span className={profile["react-icon"]}><FcReading /></span>漫画数</p>
              <div>{ comics.length}件</div>
            </div>
            <div className={profile.list}>
              <p className={profile['detail-list']}><span className={profile["react-icon"]}><FcFilm /></span>シーン数</p>
              <div>{ scenePostCounts.length }件</div>
            </div>
            <div className={profile.list}>
              <p className={profile['detail-list']}><span className={profile["react-icon"]}><FcLike /></span>お気に入り数</p>
              <div>{ favorites.data.length }件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
