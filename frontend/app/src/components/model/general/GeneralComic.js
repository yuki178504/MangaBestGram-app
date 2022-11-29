import { useGeneralComic } from "../../../hooks/useGeneralComic";
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import noimage from "../../../image/default.png";
import generalComic from "../../../css/model/general/generalComic.module.css";
import { AiFillHome } from "react-icons/ai";
import { BsBookFill, BsJournalBookmarkFill } from "react-icons/bs";

const GeneralComic = () => {
  const { useGetGeneralComic } = useGeneralComic();
  const { data: comics, isLoading } = useGetGeneralComic();

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={generalComic.wrapper}>
      <div className={generalComic["top-list"]}>
        <div className={generalComic.title}>
          <span className={generalComic.home}>
            <Link to='/' className={generalComic["home-link"]}><span className={generalComic["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
        </div>
      </div>
      <div className={generalComic["main-content"]}>
        {comics.data.map((comic) => (
          <div key={comic.id} className={generalComic.content}>
            <div className={generalComic["innner-content"]}>
              <div className={generalComic.list}>
                <div className={generalComic["user-name"]}><img className={generalComic["user-image"]} src={ comic.attributes.comicUserImage.url } alt='画像' onError={(e) => e.target.src = noimage} />{ comic.attributes.comicUserName }</div>
                <div className={generalComic["detail-area"]}>
                  <p className={generalComic.detail}><span className={generalComic["bs-book-fill"]}><BsBookFill /></span>【漫画名】</p>
                  <div>{ comic.attributes.title }</div>
                </div>
                <div className={generalComic["detail-area"]}>
                  <p className={generalComic.detail}><span className={generalComic["bs-journal-book-mark-fill"]}><BsJournalBookmarkFill /></span>【ジャンル】</p>
                  <div>{ comic.attributes.genre }</div>
                </div>
                <div className={generalComic["detail-area-link"]}>
                  <Link to={`/general_scene_post/${comic.attributes.title}/${comic.id}`} className={generalComic["link-show"]} >シーンを見る</Link>
                </div>
              </div>
              <div className={generalComic["outer-image"]}>
                <img className={generalComic.image} src={ comic.attributes.image.url } alt='画像' onError={(e) => e.target.src = noimage} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralComic;
