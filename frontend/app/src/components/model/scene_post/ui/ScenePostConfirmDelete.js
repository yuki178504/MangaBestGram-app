import { useNavigate, useParams } from "react-router-dom";
import { useScenePost } from "../../../../hooks/useScenePost";
import ReactLoading from "react-loading";
import confirm from "../../../../css/ui/Confirm.module.css";
import { FcFilm, FcCalendar, FcPicture, FcUpLeft, FcContacts, FcNews } from "react-icons/fc";
import { BsFillTrashFill } from "react-icons/bs";
import scenery from "../../../../image/scenery.png";

const ScenePostConfirmDelete = () => {
  const { scene_post_id, comic_id, comic_title } = useParams();
  const navigate = useNavigate();

  const { useDeleteScenePost, useShowScenePost } =useScenePost();
  const deketeScenePost = useDeleteScenePost(comic_id, scene_post_id);
  const { data: scene_post, isLoading } = useShowScenePost(scene_post_id);

  const handleDeleteScenePost = () => {
    deketeScenePost.mutate();
    alert(`${scene_post.scene_title}を削除しました！`);
    navigate(`/comic/${comic_id}/${comic_title}`)
  }

  if(isLoading) return <ReactLoading type="spin" color="blue" className='loading' />

  return (
    <div className={confirm.section}>
      <div className={confirm.content}>
        <div className={confirm.article}>
          <div className={confirm['confirm-title']}>以下の内容を削除してもよろしいですか？</div>
          <div className={confirm["detail-area"]}>
            <p className={confirm.detail}><span className={confirm["react-icon"]}><FcFilm /></span>サブタイトル</p>
            <div>{ scene_post.sub_title }</div>
          </div>
          <div className={confirm["detail-area"]}>
            <p className={confirm.detail}><span className={confirm["react-icon"]}><FcNews /></span>シーンの内容</p>
            <div>{ scene_post.scene_title }</div>
          </div>
          <div className={confirm["detail-area"]}>
            <p className={confirm.detail}><span className={confirm["react-icon"]}><FcContacts /></span>シーンの話数</p>
            <div>{ scene_post.scene_number }</div>
          </div>
          <div className={confirm["detail-area"]}>
            <p className={confirm.detail}><span className={confirm["react-icon"]}><FcCalendar /></span>シーンを見た日付</p>
            <div>{ scene_post.scene_date }</div>
          </div>
          <div className={confirm["detail-area"]}>
            <p className={confirm.detail}><span className={confirm["react-icon"]}><FcCalendar /></span>シーンの詳細・感想</p>
            <div>{ scene_post.scene_content }</div>
          </div>
          <div className={confirm["outer-image"]}>
          <p className={confirm.detail}><span className={confirm["react-icon"]}><FcPicture /></span>シーンの画像</p>
            <img className={confirm.image} src={ scene_post.scene_image.url } alt='画像' onError={(e) => e.target.src = scenery} />
          </div>
          <div className={confirm["detail-area-delete"]}>
            <button className={confirm['delete-button']} onClick={handleDeleteScenePost}><span className={confirm['delete-button-icon']}><BsFillTrashFill /></span>削除</button>
          </div>
          <div className={confirm["detail-area"]}>
            <button onClick={() => navigate(-1)} className={confirm.back}><span className={confirm["react-icon"]}><FcUpLeft /></span>{ scene_post.sub_title }の編集画面へ戻る</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenePostConfirmDelete;
