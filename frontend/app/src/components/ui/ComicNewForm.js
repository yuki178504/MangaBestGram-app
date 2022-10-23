import comicNewGenreJson from "../../json/comicNewGenre.json"
import newComicForm from "../../css/ui/newComicForm.module.css"

const ComicNewForm = (props) => {
  const { handleChange, handleSubmit, value, buttonType } = props

  return (
    <>
      <form className={newComicForm.form}>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画のタイトル</div>
          <input className={newComicForm["form-input"]} type="text" name="title" id="title" placeholder="漫画のタイトルを入力してください" onChange={(e) => handleChange(e)} value={value.title}/>
        </div>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画のジャンル</div>
          <select className={newComicForm["form-input"]} name="genre" id="genre" onChange={(e) => handleChange(e)}>
            <option>ジャンルを選択してください</option>
            {comicNewGenreJson.map((genre, index) =>
              <option key={index} value={genre.genre}>{ genre.genre }</option>
            )};
          </select>
        </div>
        <div className={newComicForm["form-text"]}>
          <div className={newComicForm["form-label"]}>漫画の画像</div>
          <input className={newComicForm["form-input"]} placeholder="画像を選択してください"/>
        </div>
        <div className={newComicForm["form-text"]}>
          <input className={newComicForm["form-submit"]} type="submit" value={buttonType} onClick={(e) => handleSubmit(e)}/>
        </div>
      </form>
    </>
  );
};

export default ComicNewForm;
