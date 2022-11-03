import { useNavigate, useParams, Link } from "react-router-dom";
import { useScenePost } from "../../../hooks/useScenePost";
import { useForm } from 'react-hook-form';
import scenePostNew from '../../../css/model/comic/scenePostNew.module.css';
import { AiFillHome } from "react-icons/ai";

const ScenePostNewForm = () => {
  const { comic_id, comic_title } = useParams();
  const navigate = useNavigate();
  const { useCreateScenePost } = useScenePost();
  const createScenePost = useCreateScenePost(comic_id);

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  const onSubmit = (data) => {
    try {
      createScenePost.mutate(data);
      console.log(data)
    } catch (e) {
      console.log(e);
    }
    navigate('/mypage');
    alert("登録されました！")
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
    <div className={scenePostNew.wrapper}>
      <div className={scenePostNew["top-list"]}>
        <div className={scenePostNew.title}>
          <span className={scenePostNew.home}>
            <Link to='/' className={scenePostNew["home-link"]}><span className={scenePostNew["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={scenePostNew["home-link"]}><span>/ マイページ</span></Link>
          </span>
          <span className={scenePostNew["comic-title"]}>
            / { comic_title }のシーン投稿画面
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={scenePostNew.form}>
        <div className={scenePostNew["form-text"]}>
          <div className={scenePostNew["form-label"]}>好きなシーン名</div>
          { errors.scene_title &&
            <div className={scenePostNew.errors}>【！好きなシーン名が空欄です】</div> 
          }
          <input
            className={scenePostNew["form-input"]}
            placeholder="好きなシーン名を入力してください"
            {...register('scene_title', {
              required: true
            })}
          />
        </div>
        <div className={scenePostNew["form-text"]}>
          <div className={scenePostNew["form-label"]}>漫画の話数</div>
          { errors.scene_number &&
            <div className={scenePostNew.errors}>【！漫画の話数を選択してください】</div> 
          }
          <select
            className={scenePostNew["form-input"]}
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
        <div className={scenePostNew["form-text"]}>
          <div className={scenePostNew["form-label"]}>好きなシーンの内容</div>
          { errors.scene_title &&
            <div className={scenePostNew.errors}>【！好きなシーンの内容が空欄です】</div> 
          }
          <textarea
            rows='10'
            cols='60'
            className={scenePostNew["form-input"]}
            placeholder="好きなシーン内容を入力してください"
            {...register('scene_content', {
              required: true
            })}
          />
        </div>
        <div className={scenePostNew["form-text"]}>
          <div className={scenePostNew["form-label"]}>シーンの画像</div>
          <input className={scenePostNew["form-input"]} placeholder="画像を選択してください"/>
        </div>
        <div className={scenePostNew["form-text"]}>
          <button className={scenePostNew["form-submit"]} type="submit">この内容で登録する</button>
        </div>
        <div className={scenePostNew["form-text"]}>
          <button onClick={() => navigate('/mypage')} className={scenePostNew["form-mypage"]}>マイページに戻る</button>
        </div>
      </form>
    </div>
  );
};

export default ScenePostNewForm;
