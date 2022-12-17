import generalUser from "../../../../css/model/user/generalUser.module.css";
import reactStringReplace from "react-string-replace";
import noimage from "../../../../image/default.png";
import { useGeneralUser } from '../../../../hooks/useGeneralUser';
import { FcVoicePresentation, FcDocument, FcFilm, FcReading, FcPodiumWithSpeaker, FcMms } from "react-icons/fc";
import { Link } from "react-router-dom";

const GeneralUserCard = ({
  userId,
  userName,
  userImage,
  userIntroduction,
  userUrl
}) => {
  const regExp = /(https?:\/\/\S+)/g;
  const { useGetGeneralUserComic, useGetGeneralScenePostCount } = useGeneralUser();

  const { data: comic, isLoading } = useGetGeneralUserComic(userId);
  const { data: scenePostCount, isLoading: scenePostCountLoading } = useGetGeneralScenePostCount(userId);
  if(isLoading) return <></>
  if(scenePostCountLoading) return <></>

  return (
    <div className={generalUser.content}>
      <div className={generalUser["innner-content"]}>
        <div className={generalUser.list}>
          <div className={generalUser["user-name"]}><img className={generalUser["user-image"]} src={ userImage } alt='画像' onError={(e) => e.target.src = noimage} /><span className={generalUser["react-icon"]}><FcPodiumWithSpeaker /></span>ユーザー名&nbsp;<span className={generalUser["user-name-text"]}>{ userName }</span></div>
          <div className={generalUser['detail-area']}>
            <p className={generalUser.detail}><span className={generalUser["react-icon"]}><FcVoicePresentation /></span>自己紹介</p>
            <div>{ userIntroduction }</div>
          </div>
          <div className={generalUser['detail-area']}>
            <p className={generalUser.detail}><span className={generalUser["react-icon"]}><FcDocument /></span>webサイトリンク</p>
            {reactStringReplace(userUrl, regExp, (match, i) => (
              <a className={generalUser.a} key={i} href={match}>{match}</a>
            ))}
          </div>
          <div className={generalUser['detail-area-count']}>
            <div className={generalUser["detail-area-list"]}>
              <p className={generalUser['detail-list']}><span className={generalUser["react-icon"]}><FcReading /></span>漫画数</p>
              <div>{ comic.length }</div>
            </div>
            <div className={generalUser["detail-area-list"]}>
              <p className={generalUser['detail-list']}><span className={generalUser["react-icon"]}><FcFilm /></span>シーン数</p>
              <div>{ scenePostCount.length }</div>
            </div>
          </div>
          <div className={generalUser["detail-area-link"]}>
            <Link to={`/users/${userId}/comics`} className={generalUser["link-show"]} ><span className={generalUser["react-icon"]}><FcMms /></span>漫画を見る</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralUserCard;
