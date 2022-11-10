import { useNavigate, useParams, Link } from "react-router-dom";
import { useScenePost } from "../../../hooks/useScenePost";
import ReactLoading from "react-loading";
import comicEdit from "../../../css/ui/comicEdit.module.css";
import { useForm } from "react-hook-form";
import newComicForm from "../../../css/ui/newComicForm.module.css";
import scenePostShow from "../../../css/model/comic/scenePostShow.module.css";
import { AiFillHome } from "react-icons/ai";
import { BsFillReplyFill } from "react-icons/bs";
import { ScenePostDeleteButton } from "../../ui/Parts";
import { AuthContext } from "../../../providers/AuthGuard";
import { useContext } from "react";
import axios from "axios";

const ScenePostEdit = () => {
  const navigate = useNavigate();
  const { scene_post_id, comic_id, comic_title  } = useParams();
  const { token } = useContext(AuthContext);

  const { useShowScenePost } = useScenePost();
  const { data: scene_post, isLoading } = useShowScenePost(scene_post_id);

  const { useDeleteScenePost } =useScenePost();
  const deketeScenePost = useDeleteScenePost(comic_id, scene_post_id);

  //削除用関数
  const handleDeleteScenePost = () => {
    if (
      window.confirm(`${scene_post.scene_title}のシーンを削除しますか？`)
    ) {
      deketeScenePost.mutate();
      alert(`${scene_post.scene_title}を削除しました！`);
      navigate(-1)
    }
  }

  //更新用関数
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("scene_title", data.scene_title);
    formData.append("scene_number", data.scene_number);
    formData.append("scene_date", data.scene_date);
    formData.append("scene_content", data.scene_content);
    formData.append("scene_image", data.scene_image[0]);

    await axios.put(`${process.env.REACT_APP_DEV_API_URL}/user/scene_posts/${scene_post_id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
    alert(`${scene_post.scene_title}を編集しました！`);
    navigate(`/comic/${comic_id}/${comic_title}`);
    console.log(data)
  };

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  if(isLoading) return <ReactLoading type="spin" color="blue" height={200} width={200} className={comicEdit.loading} />
  console.log(scene_post)

  const setNumber = () => {
    const num = [];
    for (let i = 1; i <= 2000; i++) {
      num.push(i);
    }
    return num;
  };

  const number = setNumber();

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
          <div className={newComicForm["form-label"]}>漫画の話数</div>
          { errors.scene_number &&
            <div className={newComicForm.errors}>【！漫画の話数を選択してください】</div> 
          }
          <select
            className={newComicForm["form-input"]}
            {...register('scene_number', {
              required: true
            })}
          >
            <option>{ scene_post.scene_number }話</option>
            {number.map((numbers, index) =>
              <option key={index} >{ numbers }話</option>
            )}
          </select>
        </div>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>好きなシーンを見た日付</div>
          <input
            type='date'
            defaultValue={ scene_post.scene_date }
            className={newComicForm["form-input"]}
            {...register('scene_date', {
              required: true
            })}
          />
        </div>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>シーンの内容</div>
          { errors.scene_content &&
            <div className={newComicForm.errors}>【！シーンの内容が空欄です】</div> 
          }
          <input
            className={newComicForm["form-input"]}
            defaultValue={ scene_post.scene_content }
            {...register('scene_content', {
              required: true
            })}
          />
        </div>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>シーンの画像</div>
          <input
            className={newComicForm["form-input"]}
            type="file"
            accept="image/*"
            {...register("scene_image")}
          />
        </div>
        <div className={newComicForm["form-text"]}>
          <button className={newComicForm["form-submit"]} type="submit">この内容で登録する</button>
        </div>
        <div className={newComicForm["form-text"]}>
          <ScenePostDeleteButton handleDeleteScenePost={handleDeleteScenePost} />
        </div>
        <div className={newComicForm["form-text"]}>
        <button onClick={() => navigate(`/comic/${comic_id}/${comic_title}`)} className={scenePostShow.back}><span className={scenePostShow["bs-fill-replay-fill"]}><BsFillReplyFill /></span>シーン一覧へ戻る</button>
        </div>
      </form>
    </>
  );
};

export default ScenePostEdit;
