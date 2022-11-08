import comicPost from '../../../css/model/comicPost.module.css';
import { Link } from 'react-router-dom';
import { useComicApi } from '../../../hooks/useComicApi';
import ReactLoading from "react-loading";

const ComicPost = () => {
  const { useGetComic } = useComicApi();
  const { data: comics, isLoading } = useGetComic();

  if(isLoading) return <ReactLoading type="spin" color='blue' />
  console.log(comics)

  return (
    <div className={comicPost.wrapper}>
      <div className={comicPost["main-content"]}>
        {comics?.map((comic) => (
          <div key={comic.id} className={comicPost.content}>
            <div className={comicPost["innner-content"]}>
              <div className={comicPost["outer-image"]}>
                <img className={comicPost.image} src={ comic.image.url } alt='画像' />
              </div>
              <div className={comicPost.list}>
                <p className={comicPost["list-title"]}>【{ comic.title }】</p>
                <p className={comicPost["list-genre"]}>【{ comic.genre }】</p>
              </div>
              <div className={comicPost["link-list"]}>
              <Link to={`/comic/${comic.id}/${comic.title}`} className={comicPost["link-show"]} >シーンを見る 追加する</Link>
              <Link to={`/comic/${comic.id}/${comic.title}/comic_edit`} className={comicPost["link-edit"]} >編集する</Link>
              </div>
            </div>
          </div>
          ))}
      </div>
    </div>
  );
};

export default ComicPost;
