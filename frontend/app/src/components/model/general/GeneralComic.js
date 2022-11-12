import { useGeneralComic } from "../../../hooks/useGeneralComic";
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import noimage from "../../../image/default.png";
import generalComic from "../../../css/model/general/generalComic.module.css";
import { AiFillHome } from "react-icons/ai";

const GeneralComic = () => {
  const { useGetGeneralComic } = useGeneralComic();
  const { data: comics, isLoading } = useGetGeneralComic();

  if(isLoading) return <ReactLoading type="spin" color='blue' />
  console.log(comics)

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
        {comics?.map((comic) => (
          <div key={comic.id} className={generalComic.content}>
            <div className={generalComic["innner-content"]}>
              <div className={generalComic["outer-image"]}>
                <img className={generalComic.image} src={ comic.image.url } alt='画像' onError={(e) => e.target.src = noimage} />
              </div>
              <div className={generalComic.list}>
                <p className={generalComic["list-title"]}>【{ comic.title }】</p>
                <p className={generalComic["list-genre"]}>【{ comic.genre }】</p>
              </div>
              <div className={generalComic["link-list"]}>
              <Link to={`/scene_post/${comic.id}`} className={generalComic["link-show"]} >シーンを見る</Link>
              </div>
            </div>
          </div>
          ))}
      </div>
    </div>
  );
};

export default GeneralComic;
