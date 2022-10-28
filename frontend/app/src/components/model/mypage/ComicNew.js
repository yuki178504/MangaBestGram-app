import { useNavigate } from "react-router-dom";
import { createComic } from "../../../api/comic";
import newComicForm from "../../../css/ui/newComicForm.module.css"
import { useForm } from 'react-hook-form';
import { useComicApi } from "../../../hooks/useComicApi";
import comicNewGenreJson from "../../../json/comicNewGenre.json";

const ComicNew = () => {
  const navigate = useNavigate();
  const { useCreateComic } = useComicApi();
  const createComic = useCreateComic();

  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    try {
      createComic.mutate(data);
      console.log(data)
    } catch (e) {
      console.log(e)
    }
    navigate('/mypage');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={newComicForm.form}>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画のタイトル</div>
          <input className={newComicForm["form-input"]} id="title" {...register('title')} placeholder="漫画のタイトルを入力してください"/>
        </div>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画のジャンル</div>
          <select className={newComicForm["form-input"]} id="genre" {...register('genre')}>
            <option>ジャンルを選択してください</option>
            {comicNewGenreJson.map((genre, index) =>
              <option key={index} >{ genre.genre }</option>
            )};
          </select>
        </div>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画の画像</div>
          <input className={newComicForm["form-input"]} placeholder="画像を選択してください"/>
        </div>
        <div className={newComicForm["form-text"]}>
          <button className={newComicForm["form-submit"]} type="submit"/>
        </div>
      </form>
    </>
  )


  // const { token } = useContext(AuthContext);
  // const [ value, setValue ] = useState({});
  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setValue({
  //     ...value,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await createComic(value, {
  //       headers: {
  //         Authorization: token,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log(res)
  //     navigate('/mypage')
  //     alert("登録されました！")
  //   } catch (e) {
  //     console.log(e)
  //     alert("正しく入力してください")
  //   };
  // };

  // return (
  //   <div className={newComicForm.wrapper}>
  //     <div className={newComicForm.content}>
  //       <div className={newComicForm.title}>漫画の新規登録</div>
  //         <ComicNewForm
  //         handleChange={ handleChange }
  //         handleSubmit={ handleSubmit }
  //         value={ value }
  //         buttonType='この内容で登録する'
  //         />
  //     </div>
  //   </div>
  // );
};

export default ComicNew;
