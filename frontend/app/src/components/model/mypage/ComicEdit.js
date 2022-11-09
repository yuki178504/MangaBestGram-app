import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useComicApi } from "../../../hooks/useComicApi";
import newComicForm from "../../../css/ui/newComicForm.module.css";
import comicEdit from "../../../css/ui/comicEdit.module.css";
import ReactLoading from "react-loading";
import comicNewGenreJson from "../../../json/comicNewGenre.json";
import { AiFillHome } from "react-icons/ai";
import { ComicDeleteButton } from "../../ui/Parts";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthGuard";
import { useContext } from "react";

const ComicEdit = () => {
  const navigate = useNavigate();
  const { comic_id, comic_title } = useParams();
  const { token } = useContext(AuthContext);
  
  const { useShowComic } = useComicApi();
  const { data: comics, isLoading } = useShowComic(comic_id);

  const { useDeleteComic } = useComicApi();
  const deleteComic = useDeleteComic(comic_id);

  //削除用関数
  const handleDeleteComic = () => {
    if (
      window.confirm("削除しますか？")
    ) {
      deleteComic.mutate();
      alert("削除しました!");
      navigate('/mypage');
    }
  };

  //更新用関数
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("genre", data.genre);
    formData.append("image", data.image[0]);

    await axios.put(`${process.env.REACT_APP_DEV_API_URL}/user/comics/${comic_id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
    alert(`${comic_title}を編集しました！`);
    navigate("/mypage");
    console.log(data)
  };

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  if(isLoading) return <ReactLoading type="spin" color="blue" />
  console.log(comics)

  return(
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
            / { comic_title }を編集中です
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={newComicForm.form}>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画のタイトル</div>
          { errors.title &&
            <div className={newComicForm.errors}>【！漫画のタイトルが空欄です】</div> 
          }
          <input
            className={newComicForm["form-input"]}
            defaultValue={ comics.title }
            {...register('title', {
              required: true
            })}
          />
        </div>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画のジャンル</div>
          { errors.genre &&
            <div className={newComicForm.errors}>【！漫画のジャンルを選択してください】</div> 
          }
          <select
            className={newComicForm["form-input"]}
            {...register('genre', {
              required: true
            })}
          >
            <option>{ comics.genre }</option>
            {comicNewGenreJson.map((genre, index) =>
              <option key={index} >{ genre.genre }</option>
            )}
          </select>
        </div>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画の画像</div>
          <input
            className={newComicForm["form-input"]}
            type="file"
            accept="image/*"
            {...register("image")}
          />
        </div>
        <div className={newComicForm["form-text"]}>
          <button className={newComicForm["form-submit"]} type="submit">この内容で登録する</button>
        </div>
        <div className={newComicForm["form-text"]}>
          <ComicDeleteButton handleDeleteComic={handleDeleteComic} />
        </div>
      </form>
    </>
  );
};

export default ComicEdit;
