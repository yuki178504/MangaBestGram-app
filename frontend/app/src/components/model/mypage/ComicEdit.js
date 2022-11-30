import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useComicApi } from "../../../hooks/useComicApi";
import form from "../../../css/ui/form.module.css";
import subMenu from "../../../css/ui/subMenu.module.css";
import scenePostShow from "../../../css/model/comic/scenePostShow.module.css";
import ReactLoading from "react-loading";
import comicNewGenreJson from "../../../json/comicNewGenre.json";
import { AiFillHome } from "react-icons/ai";
import { ComicDeleteButton } from "../../ui/Parts";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthGuard";
import { useContext } from "react";
import { BsFillReplyFill } from "react-icons/bs";

const ComicEdit = () => {
  const navigate = useNavigate();
  const { comic_id, comic_title } = useParams();
  const { token } = useContext(AuthContext);
  
  const { useShowComic } = useComicApi();
  const { data: comics, isLoading } = useShowComic(comic_id);

  const { useDeleteComic } = useComicApi();
  const deleteComic = useDeleteComic(comic_id);

  //削除用関数
  const handleDeleteComic = () => {
    if (
      window.confirm(`${comic_title}を削除しますか？`)
    ) {
      deleteComic.mutate();
      alert(`${comic_title}を削除しました!`);
      navigate('/mypage');
    }
  };

  //更新用関数
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("genre", data.genre);
    formData.append("image", data.image[0]);

    await axios.put(`${process.env.REACT_APP_DEV_API_URL}/user/comics/${comic_id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
    alert(`${comic_title}を編集しました！`);
    navigate("/mypage");
  };

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  if(isLoading) return <ReactLoading type="spin" color="blue" className='loading' />

  return(
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>
            <Link to='/mypage' className={subMenu["home-link"]}><span>/ マイページ</span></Link>
          </span>
          <span className={subMenu["comic-title"]}>
            / { comic_title }を編集中です
          </span>
        </div>
      </div>
      <div className={subMenu.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}>漫画のタイトル</div>
            { errors.title &&
              <div className={form.errors}>【！漫画のタイトルが空欄です】</div> 
            }
            <input
              className={form["form-input"]}
              defaultValue={ comics.title }
              {...register('title', {
                required: true
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
              {...register('genre', {
                required: true
              })}
            >
              <option>{ comics.genre }</option>
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
          <div className={form["form-text"]}>
            <button className={form["form-submit"]} type="submit">この内容で登録する</button>
          </div>
          <div className={form["form-text-delete"]}>
            <ComicDeleteButton handleDeleteComic={handleDeleteComic} />
          </div>
          <div className={form["form-text-back"]}>
            <button onClick={() => navigate('/mypage')} className={scenePostShow.back}><span className={scenePostShow["bs-fill-replay-fill"]}><BsFillReplyFill /></span>マイページへ戻る</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComicEdit;
