import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import form from '../../../css/ui/form.module.css';
import comicEdit from "../../../css/ui/comicEdit.module.css";
import scenePostShow from "../../../css/model/comic/scenePostShow.module.css";
import { AiFillHome } from "react-icons/ai";
import { AuthContext } from "../../../providers/AuthGuard";
import { useContext } from "react";
import axios from "axios";
import { BsFillReplyFill } from "react-icons/bs";

const ScenePostNewForm = () => {
  const { comic_id, comic_title } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

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

    await axios.post(`${process.env.REACT_APP_DEV_API_URL}/user/comics/${comic_id}/scene_posts`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
    alert("新規登録が完了しました！");
    navigate("/mypage");
    console.log(data)
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
    <div className={comicEdit.wrapper}>
      <div className={comicEdit["top-list"]}>
        <div className={comicEdit.title}>
          <span className={comicEdit.home}>
            <Link to='/' className={comicEdit["home-link"]}><span className={comicEdit["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={comicEdit["home-link"]}><span>/ マイページ</span></Link>
          </span>
          <span className={comicEdit["comic-title"]}>
            / { comic_title }のシーン投稿画面
          </span>
        </div>
      </div>
      <div className={comicEdit.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}>好きなシーン名</div>
            { errors.scene_title &&
              <div className={form.errors}>【！好きなシーン名が空欄です】</div> 
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
            <div className={form["form-label"]}>漫画の話数</div>
            { errors.scene_number &&
              <div className={form.errors}>【！漫画の話数を選択してください】</div> 
            }
            <select
              className={form["form-input"]}
              {...register('scene_number', {
                required: true
              })}
            >
              <option></option>
              {number.map((numbers, index) =>
                <option key={index} >{ numbers }話</option>
              )}
            </select>
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}>好きなシーンを見た日付</div>
            <input
              type='date'
              className={form["form-input"]}
              placeholder="好きなシーン名を入力してください"
              {...register('scene_date', {
                required: true
              })}
            />
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}>好きなシーンの内容</div>
            { errors.scene_title &&
              <div className={form.errors}>【！好きなシーンの内容が空欄です】</div> 
            }
            <textarea
              rows='10'
              cols='60'
              className={form["form-input"]}
              placeholder="好きなシーン内容を入力してください"
              {...register('scene_content', {
                required: true
              })}
            />
          </div>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}>シーンの画像</div>
            <input
              className={form["form-input-image"]}
              type="file"
              accept="image/*"
              {...register("scene_image")}
            />
          </div>
          <div className={form["form-text"]}>
            <button className={form["form-submit"]} type="submit">この内容で登録する</button>
          </div>
          <div className={form["form-text-back"]}>
            <button onClick={() => navigate(-1)} className={scenePostShow.back}><span className={scenePostShow["bs-fill-replay-fill"]}><BsFillReplyFill /></span>{ comic_title }のシーン一覧に戻る</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScenePostNewForm;
