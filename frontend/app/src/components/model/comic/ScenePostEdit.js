import { useNavigate, useParams, Link } from "react-router-dom";
import { useScenePost } from "../../../hooks/useScenePost";
import ReactLoading from "react-loading";
import comicEdit from "../../../css/ui/comicEdit.module.css";
import { useForm } from "react-hook-form";
import newComicForm from "../../../css/ui/newComicForm.module.css";
import { AiFillHome } from "react-icons/ai";

const ScenePostEdit = () => {
  const navigate = useNavigate();
  const { scene_post_id, comic_id  } = useParams();

  const { useShowScenePost } = useScenePost();
  const { data: scene_post, isLoading } = useShowScenePost(scene_post_id);

  const { usePutScenePost } = useScenePost();
  const putScenePost = usePutScenePost(comic_id, scene_post_id);

  //更新用関数
  const onSubmit = (data) => {
    try {
      putScenePost.mutate(data);
    } catch (error) {
      console.error(error.response.data);
    }
    alert("編集されました");
    navigate('/')
  };

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  if(isLoading) return <ReactLoading type="spin" />
  console.log(scene_post)

  return (
    <>
    <div className={comicEdit["top-list"]}>
        <div className={comicEdit.title}>
          <span className={comicEdit.home}>
            <Link to='/' className={comicEdit["home-link"]}><span className={comicEdit["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={comicEdit["home-link"]}><span>/ マイページ</span></Link>
          </span>
          <span className={comicEdit["comic-title"]}>
            / { scene_post.scene_title }を編集中です
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={newComicForm.form}>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>シーンのタイトル</div>
          { errors.scene_title &&
            <div className={newComicForm.errors}>【！シーンのタイトルが空欄です】</div> 
          }
          <input
            className={newComicForm["form-input"]}
            defaultValue={ scene_post.scene_title }
            {...register('scene_title', {
              required: true
            })}
          />
        </div>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画の画像</div>
          <input className={newComicForm["form-input"]} placeholder="画像を選択してください"/>
        </div>
        <div className={newComicForm["form-text"]}>
          <button className={newComicForm["form-submit"]} type="submit">この内容で登録する</button>
        </div>
        <div className={newComicForm["form-text"]}>
          <button className={comicEdit["form-delete"]} >削除</button>
        </div>
      </form>
    </>
  );
};

export default ScenePostEdit;
