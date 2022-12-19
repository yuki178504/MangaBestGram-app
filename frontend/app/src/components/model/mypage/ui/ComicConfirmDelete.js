import { useComic } from "../../../../hooks/useComic";
import { BsFillTrashFill } from "react-icons/bs";
import { FcReading, FcFile, FcUpLeft, FcPicture } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import confirm from "../../../../css/ui/Confirm.module.css";

const ComicConfirmDelete = () => {
  const navigate = useNavigate();
  const { comic_id, comic_title } = useParams();

  const { useShowComic, useDeleteComic } = useComic();
  const { data: comic, isLoading } = useShowComic(comic_id);
  const deleteComic = useDeleteComic(comic_id);

  if(isLoading) return <ReactLoading type="spin" color="blue" className='loading' />

  const handleDeleteComic = () => {
    deleteComic.mutate();
    alert(`${comic_title}を削除しました!`);
    navigate('/mypage');
  };

  return (
    <div className={confirm.section}>
      <div className={confirm.content}>
        <div className={confirm.article}>
          <div className={confirm['confirm-title']}>以下の内容を削除してもよろしいですか？</div>
          <div className={confirm["detail-area"]}>
            <p className={confirm.detail}><span className={confirm["react-icon"]}><FcReading /></span>漫画のタイトル</p>
            <div>{ comic.title }</div>
          </div>
          <div className={confirm["detail-area"]}>
            <p className={confirm.detail}><span className={confirm["react-icon"]}><FcFile /></span>漫画のジャンル</p>
            <div>{ comic.genre }</div>
          </div>
          <div className={confirm["outer-image"]}>
          <p className={confirm.detail}><span className={confirm["react-icon"]}><FcPicture /></span>漫画の画像</p>
            <img className={confirm.image} src={ comic.image.url } alt='画像' onError={(e) => e.target.src = noimage} />
          </div>
          <div className={confirm["detail-area-delete"]}>
            <button className={confirm['delete-button']} onClick={handleDeleteComic}><span className={confirm['delete-button-icon']}><BsFillTrashFill /></span>削除</button>
          </div>
          <div className={confirm["detail-area"]}>
            <button onClick={() => navigate(-1)} className={confirm.back}><span className={confirm["react-icon"]}><FcUpLeft /></span>{ comic.title }の編集画面へ戻る</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicConfirmDelete;
