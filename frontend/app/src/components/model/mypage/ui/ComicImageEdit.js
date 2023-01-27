import { useNavigate, useParams } from "react-router-dom";
import { useComic } from "../../../../hooks/useComic";
import ReactLoading from "react-loading";
import { useForm } from "react-hook-form";
import form from "../../../../css/ui/form.module.css";
import subMenu from "../../../../css/ui/subMenu.module.css";
import { FcPicture, FcFeedback, FcUpLeft, FcHighPriority } from "react-icons/fc";
import scenery from "../../../../image/scenery.png";

const ComicImageEdit = () => {
  const navigate = useNavigate();
  const { comic_id, comic_title } = useParams();

  const { useShowComic, usePutComic } = useComic();
  const { data: comic, isLoading } = useShowComic(comic_id);
  const putComic = usePutComic(comic_id);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      putComic.mutate(formData);
    } catch (error) {
      console.error(error.response.data);
    }
    alert(`画像が変更されました！`);
    navigate("/mypage");
  };

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  if(isLoading) return <ReactLoading type="spin" color="blue" className='loading' />

  return (
    <div className={subMenu.wrapper}>
      <div className={subMenu.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
          <div className={form["form-text"]}>
            <div className={form["outer-image"]}>
              <p className={form.detail}><span className={form["react-icon"]}><FcPicture /></span>現在の画像</p>
              <img className={form.image} src={ comic.image.url } alt='画像' onError={(e) => e.target.src = scenery} />
            </div>
            <div className={form["form-text-image"]}>
              { errors.image &&
                <div className={form.errors}><span className={form["react-icon"]}><FcHighPriority /></span>画像を選択してください</div> 
              }
              <input
                className={form["form-input-image"]}
                type="file"
                accept="image/*"
                {...register("image", {
                  required: true
                })}
              />
            </div>
          </div>
          <div className={form["form-text"]}>
            <button className={form["form-submit"]} type="submit"><span className={form["react-icon"]}><FcFeedback /></span>この内容で登録する</button>
          </div>
          <div className={form["form-text-back"]}>
            <button onClick={() => navigate(-1)} className={form.back}><span className={form["react-icon"]}><FcUpLeft /></span>{ comic_title }の編集画面に戻る</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComicImageEdit;
