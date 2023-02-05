import { useGeneralUser } from "../../../hooks/useGeneralUser";
import ReactLoading from "react-loading";
import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import generalComic from "../../../css/model/general/generalComic.module.css";
import generalUser from "../../../css/model/user/generalUser.module.css";
import generalUserComic from "../../../css/model/user/generalUserComic.module.css";
import subMenu from '../../../css/ui/subMenu.module.css';
import { FcReading, FcFile, FcCalendar, FcMms, FcFilm, FcVoicePresentation, FcDocument } from "react-icons/fc";
import moment from 'moment';
import noimage from "../../../image/default.png";
import scenery from "../../../image/scenery.png";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { usePagination } from "../../../hooks/usePagination";
import { useState } from "react";
import { UserInformationIntroduction, UserInformationName, UserInformationWebLink } from "../../ui/UserInformationDisplay";
import { FcPodiumWithSpeaker } from "react-icons/fc";
import reactStringReplace from "react-string-replace";

const GeneralUserComic = () => {
  const { user_id } = useParams();
  const { useGetGeneralUserComic, useShowGeneralUser, useGetGeneralScenePostCount } = useGeneralUser();

  const { data: comics, isLoading } = useGetGeneralUserComic(user_id);
  const { data: user, isLoading: userLoading } = useShowGeneralUser(user_id);
  const { data: scenePostCount, isLoading: scenePostCountLoading } = useGetGeneralScenePostCount(user_id);

  const regExp = /(https?:\/\/\S+)/g;

  // ページネーション用
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  let data = comics === undefined ? [{ length: 0 }] : comics;

  // ページネーション
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const handleChange = (_e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  if(userLoading) return <></>
  if(scenePostCountLoading) return <></>

  return (
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span className={subMenu.home}>
            <Link to='/users' className={subMenu["home-link"]}>/&nbsp;ユーザー一覧</Link>
          </span>
          <span>/&nbsp;{user.name}の漫画一覧</span>
        </div>
      </div>
      <div className={generalUserComic["main-user-image"]}><img className={generalUserComic["user-image"]} src={ user.image.url } alt='画像' onError={(e) => e.target.src = noimage} /></div>
      <div className={generalUserComic.content}>
        <div className={generalUserComic["innner-content"]}>
          <div className={generalUser.list}>
            <div className={generalUser["user-name"]}>
              <span className={generalUser["react-icon"]}><FcPodiumWithSpeaker /></span>ユーザー名&nbsp;<span className={generalUser["user-name-text"]}><UserInformationName userName={user.name} />{ user.name }</span>
            </div>
            <div className={generalUser['detail-area']}>
              <p className={generalUser.detail}><span className={generalUser["react-icon"]}><FcVoicePresentation /></span>自己紹介</p>
              <UserInformationIntroduction userIntroduction={user.introduction} />
              <div>{ user.introduction }</div>
            </div>
            <div className={generalUser['detail-area']}>
              <p className={generalUser.detail}><span className={generalUser["react-icon"]}><FcDocument /></span>webサイトリンク</p>
              <UserInformationWebLink userUrl={user.url} />
              {reactStringReplace(user.url, regExp, (match, i) => (
                <a className={generalUser.a} key={i} href={match}>{match}</a>
              ))}
            </div>
            <div className={generalUser['detail-area-count']}>
              <div className={generalUser["detail-area-list"]}>
                <p className={generalUser['detail-list']}><span className={generalUser["react-icon"]}><FcReading /></span>漫画数</p>
                <div>{ comics.length }</div>
              </div>
              <div className={generalUser["detail-area-list"]}>
                <p className={generalUser['detail-list']}><span className={generalUser["react-icon"]}><FcFilm /></span>シーン数</p>
                <div>{ scenePostCount.length }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={generalComic["main-content"]}>
        {_DATA.currentData().map((comic) => (
          <div key={comic.id} className={generalComic.content}>
            <div className={generalComic["innner-content"]}>
              <div className={generalComic.list}>
                <div className={generalComic["user-name"]}><img className={generalComic["user-image"]} src={ user.image.url } alt='画像' onError={(e) => e.target.src = noimage} />{ user.name }</div>
                <div className={generalComic["detail-area"]}>
                  <p className={generalComic.detail}><span className={generalComic["react-icon"]}><FcReading /></span>漫画名</p>
                  <div>{ comic.title }</div>
                </div>
                <div className={generalComic["detail-area"]}>
                  <p className={generalComic.detail}><span className={generalComic["react-icon"]}><FcFile /></span>ジャンル</p>
                  <div>{ comic.genre }</div>
                </div>
                <div className={generalComic["detail-area-link"]}>
                  <Link to={`/general_scene_post/${comic.title}/${comic.id}`} className={generalComic["link-show"]} ><span className={generalComic["react-icon"]}><FcMms /></span>シーンを見る</Link>
                </div>
              </div>
              <div className={generalComic["outer-image"]}>
                <div className={generalComic["detail-area-image"]}>
                  <div className={generalComic["create-at"]}><span className={generalComic["detail-text"]}><span className={generalComic["react-icon"]}><FcCalendar /></span>{ moment(comic.createdAt).format('YYYY年MM月DD日HH:mm') }</span></div>
                  <img className={generalComic.image} src={ comic.image.url } alt='画像' onError={(e) => e.target.src = scenery} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign: "center"}}>
        <Pagination
        className={generalComic.pagination}
        count={count}
        page={page}
        renderItem={(item) => (
          <PaginationItem
            components={{
              previous: ArrowBackIcon,
              next: ArrowForwardIcon,
            }}
            {...item}
          />
        )}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default GeneralUserComic;
