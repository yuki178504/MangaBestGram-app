import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { AuthContext } from "../../../providers/AuthGuard";
import newComicForm from "../../../css/ui/newComicForm.module.css";
import { AiFillHome } from "react-icons/ai";
import { BsFillReplyFill } from "react-icons/bs";
import axios from "axios";
import ReactLoading from "react-loading";
import comicEdit from "../../../css/ui/comicEdit.module.css";
import scenePostShow from "../../../css/model/comic/scenePostShow.module.css";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const { token } = useContext(AuthContext);

  const { useGetUser } = useUser();
  const { data: user, isLoading } = useGetUser(user_id);

  //更新関数
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("introduction", data.introduction);
    formData.append("url", data.url);
    formData.append("image", data.image[0]);

    await axios.put(`${process.env.REACT_APP_DEV_API_URL}/user/users/${user_id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
    alert(`編集しました！`);
    navigate("/mypage");
  };

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  if(isLoading) return <ReactLoading type="spin" color="blue" className='loading' />

  return (
    <div className={comicEdit.wrapper}>
      <div className={comicEdit["top-list"]}>
        <div className={comicEdit.title}>
          <span className={comicEdit.home}>
            <Link to='/' className={comicEdit["home-link"]}><span className={comicEdit["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={comicEdit["home-link"]}><span>/ マイページ</span></Link>
          </span>
          <span>/ プロフィール編集</span>
        </div>
      </div>
      <div className={comicEdit.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={newComicForm.form}>
          <div className={newComicForm["form-text"]}>
            <div className={newComicForm["form-label"]}>ユーザー名</div>
            { errors.name &&
              <div className={newComicForm.errors}>【！ユーザー名がありません】</div> 
            }
            <input
              className={newComicForm["form-input"]}
              defaultValue={ user.name }
              {...register('name', {
                required: true
              })}
            />
          </div>
          <div className={newComicForm["form-text"]}>
            <div className={newComicForm["form-label"]}>自己紹介</div>
            <input
              className={newComicForm["form-input"]}
              defaultValue={ user.introduction }
              {...register('introduction')}
            />
          </div>
          <div className={newComicForm["form-text"]}>
            <div className={newComicForm["form-label"]}>リンク</div>
            <input
              className={newComicForm["form-input"]}
              defaultValue={ user.url }
              {...register('url')}
            />
          </div>
          <div className={newComicForm["form-text"]}>
            <div className={newComicForm["form-label"]}>ユーザーアイコン</div>
            <input
              className={newComicForm["form-input-image"]}
              type="file"
              accept="image/*"
              {...register("image")}
            />
          </div>
          <div className={newComicForm["form-text"]}>
            <button className={newComicForm["form-submit"]} type="submit">この内容で登録する</button>
          </div>
          <div className={newComicForm["form-text-back"]}>
            <button onClick={() => navigate('/mypage')} className={scenePostShow.back}><span className={scenePostShow["bs-fill-replay-fill"]}><BsFillReplyFill /></span>マイページへ戻る</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
