import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { AuthContext } from "../../../providers/AuthGuard";
import form from "../../../css/ui/form.module.css";
import { BsFillReplyFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import ReactLoading from "react-loading";
import subMenu from "../../../css/ui/subMenu.module.css";
import scenePostShow from "../../../css/model/scene_post/scenePostShow.module.css";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const { token } = useContext(AuthContext);

  const { useGetUser } = useUser();
  const { data: user, isLoading } = useGetUser(user_id);

  //更新関数
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("introduction", data.introduction);
    formData.append("url", data.url);
    formData.append("image", data.image[0]);

    await axios.put(`${process.env.REACT_APP_DEV_API_URL}/user/users/${user_id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
    alert(`編集しました！`);
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
            <div className={form["form-label"]}>ユーザー名</div>
            { errors.name &&
              <div className={form.errors}>【！ユーザー名がありません】</div> 
            }
            <input
              className={form["form-input"]}
              defaultValue={ user.name }
              {...register('name', {
                required: true
              })}
            />
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}>自己紹介</div>
            <input
              className={form["form-input"]}
              defaultValue={ user.introduction }
              {...register('introduction')}
            />
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}>リンク</div>
            <input
              className={form["form-input"]}
              defaultValue={ user.url }
              {...register('url')}
            />
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}>ユーザーアイコン</div>
            <input
              className={form["form-input-image"]}
              type="file"
              accept="image/*"
              {...register("image")}
            />
          </div>
          <div className={form["form-text"]}>
            <button className={form["form-submit"]} type="submit"><span className={form["fi-send"]}><FiSend /></span>この内容で登録する</button>
          </div>
          <div className={form["form-text-back"]}>
            <button onClick={() => navigate('/mypage')} className={scenePostShow.back}><span className={scenePostShow["bs-fill-replay-fill"]}><BsFillReplyFill /></span>マイページへ戻る</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
