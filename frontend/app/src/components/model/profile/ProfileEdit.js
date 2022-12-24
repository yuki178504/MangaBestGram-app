import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import form from "../../../css/ui/form.module.css";
import { FcPortraitMode, FcGraduationCap, FcImageFile, FcFeedback, FcButtingIn, FcUpLeft, FcHighPriority } from "react-icons/fc";
import ReactLoading from "react-loading";
import subMenu from "../../../css/ui/subMenu.module.css";
import scenePostShow from "../../../css/model/scene_post/scenePostShow.module.css";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();

  const { useGetUser, usePutUser } = useUser();
  const { data: user, isLoading } = useGetUser(user_id);
  const putUser = usePutUser(user_id);

  //更新関数
  const onSubmit = async (data) => {
    try {
      putUser.mutate(data);
    } catch (error) {
      console.error(error.response.data);
    }
    alert('編集しました！')
    navigate('/mypage')
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
            <div className={form["form-label"]}><span className={form["react-icon"]}><FcPortraitMode /></span>ユーザー名</div>
            { errors.name &&
              <div className={form.errors}><span className={form["react-icon"]}><FcHighPriority /></span>ユーザー名がありません</div> 
            }
            <input
              className={form["form-input"]}
              defaultValue={ user.name }
              placeholder={"ユーザー名を入力してください"}
              {...register('name', {
                required: true
              })}
            />
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}><span className={form["react-icon"]}><FcGraduationCap /></span>自己紹介</div>
            <input
              className={form["form-input"]}
              defaultValue={ user.introduction }
              placeholder={"自己紹介を入力してください"}
              {...register('introduction')}
            />
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}><span className={form["react-icon"]}><FcImageFile /></span>リンク</div>
            <input
              className={form["form-input"]}
              defaultValue={ user.url }
              placeholder={"WEBのリンクなどを入力してください"}
              {...register('url')}
            />
          </div>
          <div className={form["form-text"]}>
            <Link to={`/my-profile/${user_id}/profile-image-edit`} className={form['image-button']}><span className={form['react-icon']}><FcButtingIn /></span>画像を変更する</Link>
          </div>
          <div className={form["form-text"]}>
            <button className={form["form-submit"]} type="submit"><span className={form["react-icon"]}><FcFeedback /></span>この内容で登録する</button>
          </div>
          <div className={form["form-text-back"]}>
            <button onClick={() => navigate('/mypage')} className={scenePostShow.back}><span className={scenePostShow["react-icon"]}><FcUpLeft /></span>マイページへ戻る</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
