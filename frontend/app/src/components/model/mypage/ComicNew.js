import { useNavigate } from "react-router-dom";
import form from "../../../css/ui/form.module.css";
import { useForm } from 'react-hook-form';
import comicNewGenreJson from "../../../json/comicNewGenre.json";
import { FcFeedback, FcReading, FcFile, FcHighPriority, FcPicture } from "react-icons/fc";
import { useComic } from "../../../hooks/useComic";

const ComicNew = () => {
  const navigate = useNavigate();
  const { useCreateComic } = useComic();
  const createComic = useCreateComic();

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("genre", data.genre);

    try {
      createComic.mutate(formData);
    } catch (error) {
      console.error(error.response.data);
    }
    alert("新規登録が完了しました！");
    navigate("/mypage");
  };

  return (
    <div className={form.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
        <div className={form["form-text"]}>
          <div className={form["form-label"]}><span className={form["react-icon"]}><FcReading /></span>漫画のタイトル</div>
          { errors.title &&
            <div className={form.errors}><span className={form["react-icon"]}><FcHighPriority /></span>漫画のタイトルが空欄です</div> 
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
          <div className={form["form-label"]}><span className={form["react-icon"]}><FcFile /></span>漫画のジャンル</div>
          { errors.genre &&
            <div className={form.errors}><span className={form["react-icon"]}><FcHighPriority /></span>漫画のジャンルを選択してください</div> 
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
          <div className={form["form-label"]}><span className={form["react-icon"]}><FcPicture /></span>漫画の画像</div>
          <input
            className={form["form-input-image"]}
            type="file"
            accept="image/*"
            {...register("image")}
          />
        </div>
        <div className={form["form-text-submit"]}>
          <button className={form["form-submit"]} type="submit"><span className={form["react-icon"]}><FcFeedback /></span>この内容で登録する</button>
        </div>
      </form>
    </div>
  );
};

export default ComicNew;
