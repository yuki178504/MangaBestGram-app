
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
          <input type="text" name="genre" id="genre" onChange={(e) => handleChange(e)} value={value.genre}/>
        </div>
        <input type="submit" value={buttonType} onClick={(e) => handleSubmit(e)}/>
      </form>
    </>
  );
};

export default ComicNewForm;
