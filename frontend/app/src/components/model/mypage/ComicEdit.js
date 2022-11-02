import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useComicApi } from "../../../hooks/useComicApi";
import newComicForm from "../../../css/ui/newComicForm.module.css";
import comicEdit from "../../../css/ui/comicEdit.module.css";
import ReactLoading from "react-loading";
import comicNewGenreJson from "../../../json/comicNewGenre.json";
import { AiFillHome } from "react-icons/ai";

const ComicEdit = () => {
  const navigate = useNavigate();
  const { comic_id, comic_title } = useParams();
  
  const { useShowComic } = useComicApi();
  const { data: comics, isLoading } = useShowComic(comic_id);

  const { usePutComic } = useComicApi();
  const putComic = usePutComic(comic_id);

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
  const onSubmit = (data) => {
    try {
      putComic.mutate(data);
    } catch (error) {
      console.error(error.res.data);
    }
    alert("編集されました");
    navigate('/mypage');
  };

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  if(isLoading) return <ReactLoading type="spin" />
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
          <input className={newComicForm["form-input"]} placeholder="画像を選択してください"/>
        </div>
        <div className={newComicForm["form-text"]}>
          <button className={newComicForm["form-submit"]} type="submit">この内容で登録する</button>
        </div>
        <div className={newComicForm["form-text"]}>
          <button className={comicEdit["form-delete"]} onClick={handleDeleteComic}>削除</button>
        </div>
      </form>
    </>
  );
};

export default ComicEdit;
