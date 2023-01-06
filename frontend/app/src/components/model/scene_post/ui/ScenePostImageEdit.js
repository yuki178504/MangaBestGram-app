import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useScenePost } from "../../../../hooks/useScenePost";
import { AuthContext } from "../../../../providers/AuthGuard";
import ReactLoading from "react-loading";
import subMenu from "../../../../css/ui/subMenu.module.css";
import form from "../../../../css/ui/form.module.css";
import scenery from "../../../../image/scenery.png";
import { FcPicture, FcFeedback, FcUpLeft, FcHighPriority } from "react-icons/fc";

const ScenePostImageEdit = () => {
  const navigate = useNavigate();
  const { scene_post_id, comic_id, comic_title  } = useParams();
  const { token } = useContext(AuthContext);

  const { useShowScenePost } = useScenePost();
  const { data: scene_post, isLoading } = useShowScenePost(scene_post_id);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("scene_image", data.scene_image[0]);

    await axios.put(`${process.env.REACT_APP_DEV_API_URL}/user/scene_posts/${scene_post_id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
    alert(`画像が変更されました！`);
    navigate(`/comic/${comic_id}/${comic_title}`);
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
              <img className={form.image} src={ scene_post.scene_image.url } alt='画像' onError={(e) => e.target.src = scenery} />
            </div>
            <div className={form["form-text-image"]}>
              { errors.scene_image &&
                <div className={form.errors}><span className={form["react-icon"]}><FcHighPriority /></span>画像を選択してください</div> 
              }
              <input
                className={form["form-input-image"]}
                type="file"
                accept="image/*"
                {...register("scene_image", {
                  required: true
                })}
              />
            </div>
          </div>
          <div className={form["form-text"]}>
            <button className={form["form-submit"]} type="submit"><span className={form["react-icon"]}><FcFeedback /></span>この内容で登録する</button>
          </div>
          <div className={form["form-text-back"]}>
            <button onClick={() => navigate(-1)} className={form.back}><span className={form["react-icon"]}><FcUpLeft /></span>{ scene_post.sub_title }の編集画面に戻る</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScenePostImageEdit;
