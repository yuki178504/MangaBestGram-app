import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import form from '../../../css/ui/form.module.css';
import subMenu from "../../../css/ui/subMenu.module.css";
import scenePostShow from "../../../css/model/scene_post/scenePostShow.module.css";
import { AiFillHome } from "react-icons/ai";
import { FcFilm, FcHighPriority, FcContacts, FcCalendar, FcKindle, FcPicture, FcFeedback, FcUpLeft, FcNews } from "react-icons/fc";
import { useScenePost } from "../../../hooks/useScenePost";

const ScenePostNew = () => {
  const { comic_id, comic_title } = useParams();
  const navigate = useNavigate();

  const { useCreateScenePost } = useScenePost();
  const createScenePost = useCreateScenePost(comic_id);

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("scene_title", data.scene_title);
    formData.append("scene_number", data.scene_number);
    formData.append("scene_date", data.scene_date);
    formData.append("scene_content", data.scene_content);
    formData.append("scene_date", data.scene_date);
    formData.append("scene_image", data.scene_image[0]);
    formData.append("sub_title", data.sub_title);

    try {
      createScenePost.mutate(formData);
    } catch (error) {
      console.error(error.response.data);
    }
    alert("新規登録が完了しました！");
    navigate(`/comic/${comic_id}/${comic_title}`);
  };

  //プルダウンリスト
  const setNumber = () => {
    const num = [];
    for (let i = 1; i <= 2000; i++) {
      num.push(i);
    }
    return num;
  };

  const number = setNumber();

  return (
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={subMenu["home-link"]}><span>/&nbsp;マイページ</span></Link>
          </span>
          <span className={subMenu["comic-title"]}>
          /&nbsp;{ comic_title }のシーン投稿画面
          </span>
        </div>
      </div>
      <div className={subMenu.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}><span className={form["react-icon"]}><FcFilm /></span>サブタイトル</div>
            { errors.sub_title &&
              <div className={form.errors}><span className={form["react-icon"]}><FcHighPriority /></span>サブタイトルが空欄です</div> 
            }
            <input
              className={form["form-input"]}
              placeholder="サブタイトルを入力してください"
              {...register('sub_title', {
                required: true
              })}
            />
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}><span className={scenePostShow["react-icon"]}><FcNews /></span>シーンの内容</div>
            { errors.scene_title &&
              <div className={form.errors}><span className={form["react-icon"]}><FcHighPriority /></span>好きなシーン名が空欄です</div> 
            }
            <input
              className={form["form-input"]}
              placeholder="好きなシーン名を入力してください"
              {...register('scene_title', {
                required: true
              })}
            />
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}><span className={form["react-icon"]}><FcContacts /></span>漫画の話数</div>
            <select
              className={form["form-input"]}
              {...register('scene_number')}
            >
              <option></option>
              {number.map((numbers, index) =>
                <option key={index} >{ numbers }話</option>
              )}
            </select>
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}><span className={form["react-icon"]}><FcCalendar /></span>シーンを見た日付</div>
            <input
              type='date'
              className={form["form-input"]}
              placeholder="好きなシーン名を入力してください"
              {...register('scene_date')}
            />
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}><span className={scenePostShow["react-icon"]}><FcKindle /></span>シーンの詳細・感想</div>
            <textarea
              rows='10'
              cols='60'
              className={form["form-input"]}
              placeholder="好きなシーンの内容を入力してください"
              {...register('scene_content')}
            />
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}><span className={form["react-icon"]}><FcPicture /></span>シーンの画像</div>
            <input
              className={form["form-input-image"]}
              type="file"
              accept="image/*"
              {...register("scene_image")}
            />
          </div>
          <div className={form["form-text"]}>
            <button className={form["form-submit"]} type="submit"><span className={form["react-icon"]}><FcFeedback /></span>この内容で登録する</button>
          </div>
          <div className={form["form-text-back"]}>
            <button onClick={() => navigate(-1)} className={scenePostShow.back}><span className={scenePostShow["react-icon"]}><FcUpLeft /></span>{ comic_title }のシーン一覧に戻る</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScenePostNew;
