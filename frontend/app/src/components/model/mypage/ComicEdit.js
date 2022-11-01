import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useComicApi } from "../../../hooks/useComicApi";
import newComicForm from "../../../css/ui/newComicForm.module.css";
import ReactLoading from "react-loading";
import comicNewGenreJson from "../../../json/comicNewGenre.json";

const ComicEdit = () => {
  const navigate = useNavigate();
  const { comic_id, comic_title } = useParams();
  const { useGetComic } = useComicApi();
  const { data: comics, isLoading } = useGetComic();

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
      <form onSubmit={handleSubmit(onSubmit)} className={newComicForm.form}>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画のタイトル</div>
          { errors.title &&
            <div className={newComicForm.errors}>【！漫画のタイトルが空欄です】</div> 
          }
          <input
            className={newComicForm["form-input"]}
            defaultValue={ comic_title }
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
            <option></option>
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
          <button className={newComicForm["form-submit"]} type="submit"/>
        </div>
        <button onClick={handleDeleteComic}>削除</button>
      </form>
    </>
  );
};

export default ComicEdit;
