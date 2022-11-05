import { useNavigate } from "react-router-dom";
import newComicForm from "../../../css/ui/newComicForm.module.css"
import { useForm } from 'react-hook-form';
import { useComicApi } from "../../../hooks/useComicApi";
import comicNewGenreJson from "../../../json/comicNewGenre.json";

const ComicNew = () => {
  const navigate = useNavigate();
  const { useCreateComic } = useComicApi();
  const createComic = useCreateComic();

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  const onSubmit = (data) => {
    try {
      createComic.mutate(data);
      console.log(data)
    } catch (e) {
      console.log(e)
    }
    navigate('/');
    alert("登録されました！")
  };

  return (
    <div className={newComicForm.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={newComicForm.form}>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画のタイトル</div>
          { errors.title &&
            <div className={newComicForm.errors}>【！漫画のタイトルが空欄です】</div> 
          }
          <input
            className={newComicForm["form-input"]}
            placeholder="漫画のタイトルを入力してください"
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
          <button className={newComicForm["form-submit"]} type="submit">この内容で登録する</button>
        </div>
      </form>
    </div>
  );
};

export default ComicNew;
