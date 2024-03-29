import { useContext } from 'react';
import home from '../css/home.module.css';
import generalComic from "../css/model/general/generalComic.module.css";
import { AuthContext } from '../providers/AuthGuard';
import { Link } from 'react-router-dom';
import { useGeneralComic } from '../hooks/useGeneralComic';
import ReactLoading from "react-loading";
import noimage from "../image/default.png";
import scenery from "../image/scenery.png";
import { Link as Scroll } from 'react-scroll';
import { BsChevronDoubleDown } from "react-icons/bs";
import { FcReading, FcFile, FcCalendar, FcMms, FcHome } from "react-icons/fc";
import moment from 'moment';
import { UserInformationName } from './ui/UserInformationDisplay';
import ScenePostCount from './ui/ScenePostCount';

const Home = () => {
  const { useGetGeneralLatestComic } = useGeneralComic();
  const { data: comics, isLoading: comicLoading } = useGetGeneralLatestComic();
  const { isAuthenticated, loginWithRedirect, isLoading } = useContext(AuthContext);

  if(comicLoading) return <></>
  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={home.wrapper}>
      <div className={home.content}>
        <div className={home.title}>
          <div className={home["title-text"]}>あなたのお気に入りの場面を共有しよう！</div>
          <div className={home.post}>
          {
            isAuthenticated ?
            <div className={home["post-title"]}>
              <Link to="/mypage" className={home["post-title-link"]} ><span className={home["react-icon"]}><FcHome /></span>マイページ</Link>
            </div>
            :
            <div className={home["post-title"]}>
              <button onClick={() => loginWithRedirect({ redirect_url: `${window.location.origin}/mypage` })} className={home["post-title-link"]}><span className={home["react-icon"]}><FcHome /></span>ログイン/新規登録</button>
            </div>
          }
          </div>
        </div>
        <div className={home.desc}>
          <h4>MangaBestGramとは？</h4>
          <p className={home["desc-text"]}>自分が気に入った！感銘を受けた！などのマンガの名場面を記録できるサービスです！</p>
          <h4>あの場面を心だけでなく、記録としても残してみませんか？</h4>
        </div>
        <div className={home.scroll}>
          <Scroll className={home["scroll-text"]} to="scroll" smooth={true} duration={600}><span className={home["bs-chevron-double-down"]}><BsChevronDoubleDown /></span>最新の投稿を見てみる</Scroll>
        </div>
      </div>
      <div className={home.section}>
        <div className={home["section-outer-title"]}>
          <span id='scroll'></span>
          <h3 className={home["section-title"]}>最新の投稿</h3>
        </div>
        <div className={home["main-content"]}>
          {comics.data.map((comic) => (
            <div key={comic.id} className={generalComic.content}>
              <div className={generalComic["innner-content"]}>
                <div className={generalComic.list}>
                  <div className={generalComic["user-name"]}>
                    <Link to={`/users/${comic.attributes.userId}/comics`} >
                      <img className={generalComic["user-image"]} src={ comic.attributes.comicUserImage.url } alt='画像' onError={(e) => e.target.src = noimage} />
                    </Link>
                    <UserInformationName userName={comic.attributes.comicUserName} />{ comic.attributes.comicUserName }
                  </div>
                  <div className={generalComic["detail-area"]}>
                    <p className={generalComic.detail}><span className={generalComic["react-icon"]}><FcReading /></span>漫画名</p>
                    <div>{ comic.attributes.title }</div>
                  </div>
                  <div className={generalComic["detail-area"]}>
                    <p className={generalComic.detail}><span className={generalComic["react-icon"]}><FcFile /></span>ジャンル</p>
                    <div>{ comic.attributes.genre }</div>
                  </div>
                  <div className={generalComic["detail-area-link"]}>
                    <Link to={`/general_scene_post/${comic.attributes.title}/${comic.id}`} className={generalComic["link-show"]} ><span className={generalComic["react-icon"]}><FcMms /></span>シーンを見る</Link>
                  </div>
                </div>
                <div className={generalComic["outer-image"]}>
                  <div className={generalComic["detail-area-image"]}>
                    <div className={generalComic["create-at"]}><span className={generalComic["detail-text"]}><span className={generalComic["react-icon"]}><FcCalendar /></span>{ moment(comic.attributes.createdAt).format('YYYY年MM月DD日HH:mm') }</span></div>
                    <img className={generalComic.image} src={ comic.attributes.image.url } alt='画像' onError={(e) => e.target.src = scenery} />
                    <div className={generalComic['detail-area-count']}>
                      <div className={generalComic['detail-area-list']}>
                        <ScenePostCount comicId={comic.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        { isAuthenticated ?
        <div className={home["outer-ranking"]}>
          <Link to='/favorite_ranking' className={home.ranking}>人気のあるシーンを見てみる！</Link>
        </div>
        :
        <div className={home["outer-ranking"]}>
          <Link to='/general_favorites_ranking' className={home.ranking}>人気のあるシーンを見てみる！</Link>
        </div>
        }
      </div>
    </div>
  );
};

export default Home;
