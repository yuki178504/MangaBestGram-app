import { useNavigate } from "react-router-dom";
import form from "../../../css/ui/form.module.css";
import { useForm } from 'react-hook-form';
import comicNewGenreJson from "../../../json/comicNewGenre.json";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthGuard";

const ComicNew = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("genre", data.genre);

    await axios.post(`${process.env.REACT_APP_DEV_API_URL}/user/comics`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
    alert("新規登録が完了しました！");
    navigate("/");
  };

  return (
    <div className={form.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
        <div className={form["form-text"]}>
          <div className={form["form-label"]}>漫画のタイトル</div>
          { errors.title &&
            <div className={form.errors}>【！漫画のタイトルが空欄です】</div> 
          }
          <input
            className={form["form-input"]}
            placeholder="漫画のタイトルを入力してください"
            name="title"
            {...register("title", {
              required: true,
            })}
          />
        </div>
        <div className={form["form-text"]}>
          <div className={form["form-label"]}>漫画のジャンル</div>
          { errors.genre &&
            <div className={form.errors}>【！漫画のジャンルを選択してください】</div> 
          }
          <select
            className={form["form-input"]}
            name="genre"
            {...register("genre", {
              required: true,
            })}
          >
            <option></option>
            {comicNewGenreJson.map((genre, index) =>
              <option key={index} >{ genre.genre }</option>
            )}
          </select>
        </div>
        <div className={form["form-text"]}>
          <div className={form["form-label"]}>漫画の画像</div>
          <input
            className={form["form-input-image"]}
            type="file"
            accept="image/*"
            {...register("image")}
          />
        </div>
        <div className={form["form-text-submit"]}>
          <button className={form["form-submit"]} type="submit">この内容で登録する</button>
        </div>
      </form>
    </div>
  );
};

export default ComicNew;
