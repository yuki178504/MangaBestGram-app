import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComic } from "../../../api/comic";
import { AuthContext } from "../../../providers/AuthGuard";
import ComicNewForm from "../../ui/ComicNewForm";
import newComicForm from "../../../css/ui/newComicForm.module.css"

const ComicNew = () => {
  const { token } = useContext(AuthContext);
  const [ value, setValue ] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await createComic(value, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      console.log(res)
      navigate('/mypage')
      alert("登録されました！")
    } catch (e) {
      console.log(e)
      alert("正しく入力してください")
    };
  };

  return (
    <div className={newComicForm.wrapper}>
      <div className={newComicForm.content}>
        <div className={newComicForm.title}>漫画の新規登録</div>
          <ComicNewForm
          handleChange={ handleChange }
          handleSubmit={ handleSubmit }
          value={ value }
          buttonType='この内容で登録する'
          />
      </div>
    </div>
  );
};

export default ComicNew;
