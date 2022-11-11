import { useGeneralComic } from "../../../hooks/useGeneralComic";
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import comicPost from '../../../css/model/comicPost.module.css';
import noimage from "../../../image/default.png";

const GeneralComic = () => {
  const { useGetGeneralComic } = useGeneralComic();
  const { data: comics, isLoading } = useGetGeneralComic();

  if(isLoading) return <ReactLoading type="spin" color='blue' />
  console.log(comics)

  return (
    <div className={comicPost.wrapper}>
      <div className={comicPost["main-content"]}>
        {comics?.map((comic) => (
          <div key={comic.id} className={comicPost.content}>
            <div className={comicPost["innner-content"]}>
              <div className={comicPost["outer-image"]}>
                <img className={comicPost.image} src={ comic.image.url } alt='画像' onError={(e) => e.target.src = noimage} />
              </div>
              <div className={comicPost.list}>
                <p className={comicPost["list-title"]}>【{ comic.title }】</p>
                <p className={comicPost["list-genre"]}>【{ comic.genre }】</p>
              </div>
              <div className={comicPost["link-list"]}>
              <Link to={`/scene_post/${comic.id}`} className={comicPost["link-show"]} >シーンを見る</Link>
              </div>
            </div>
          </div>
          ))}
      </div>
    </div>
  );
};

export default GeneralComic;
