import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";
import { AuthContext } from "../../../../providers/AuthGuard";
import ReactLoading from "react-loading";
import subMenu from "../../../../css/ui/subMenu.module.css";
import form from "../../../../css/ui/form.module.css";
import { FcPicture, FcFeedback, FcUpLeft, FcHighPriority } from "react-icons/fc";

const ProfileImageEdit = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const { token } = useContext(AuthContext);

  const { useGetUser } = useUser();
  const { data: user, isLoading } = useGetUser(user_id);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    await axios.put(`${process.env.REACT_APP_DEV_API_URL}/user/users/${user_id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
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
            <div className={form["profile-outer-image"]}>
              <p className={form.detail}><span className={form["react-icon"]}><FcPicture /></span>現在の画像</p>
              <img className={form["profile-image"]} src={ user.image.url } alt='画像' onError={(e) => e.target.src = noimage} />
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
            <button onClick={() => navigate(-1)} className={form.back}><span className={form["react-icon"]}><FcUpLeft /></span>{ user.name }の編集画面に戻る</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileImageEdit;
