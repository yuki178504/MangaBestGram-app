import { useGeneralUser } from "../../../hooks/useGeneralUser";
import ReactLoading from "react-loading";
import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import generalComic from "../../../css/model/general/generalComic.module.css";
import subMenu from '../../../css/ui/subMenu.module.css';
import { FcReading, FcFile, FcCalendar, FcMms } from "react-icons/fc";
import moment from 'moment';
import noimage from "../../../image/default.png";
import scenery from "../../../image/scenery.png";

const GeneralUserComic = () => {
  const { user_id } = useParams();
  const { useGetGeneralUserComic, useShowGeneralUser } = useGeneralUser();

  const { data: comics, isLoading } = useGetGeneralUserComic(user_id);
  const { data: user, isLoading: userLoading } = useShowGeneralUser(user_id);
  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  if(userLoading) return <></>

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
      <div className={generalComic.count}>【投稿数】&nbsp;{comics.length}件</div>
      <div className={generalComic["main-content"]}>
        {comics.map((comic) => (
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
    </div>
  );
};

export default GeneralUserComic;
