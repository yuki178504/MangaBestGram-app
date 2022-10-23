import comicNewGenreJson from "../../json/comicNewGenre.json"

const ComicNewForm = (props) => {
  const { handleChange, handleSubmit, value, buttonType } = props

  return (
    <>
      <form>
        <div>
          <label htmlFor="title">登録したい漫画のタイトル</label>
          <input type="text" name="title" id="title" onChange={(e) => handleChange(e)} value={value.title}/>
        </div>
        <div>
          <label htmlFor="genre">登録する漫画のジャンル</label>
          <select name="genre" id="genre" onChange={(e) => handleChange(e)}>
            <option>ジャンルを選択してください</option>
            {comicNewGenreJson.map((genre, index) =>
              <option key={index} value={genre.genre}>{ genre.genre }</option>
            )};
          </select>
        </div>
        <input type="submit" value={buttonType} onClick={(e) => handleSubmit(e)}/>
      </form>
    </>
  );
};

export default ComicNewForm;
