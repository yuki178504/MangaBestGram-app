import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useComic } from "../../../hooks/useComic";
import form from "../../../css/ui/form.module.css";
import subMenu from "../../../css/ui/subMenu.module.css";
import ReactLoading from "react-loading";
import comicNewGenreJson from "../../../json/comicNewGenre.json";
import { AiFillHome } from "react-icons/ai";
import { FcReading, FcHighPriority, FcFile, FcPicture, FcFeedback, FcUpLeft } from "react-icons/fc";
import { BsFillTrashFill } from "react-icons/bs";

const ComicEdit = () => {
  const navigate = useNavigate();
  const { comic_id, comic_title } = useParams();

  const { useShowComic, usePutComic } = useComic();
  const { data: comics, isLoading } = useShowComic(comic_id);
  const putComic = usePutComic(comic_id);

  const onSubmit = (data) => {
    try {
      putComic.mutate(data);
    } catch (error) {
      console.error(error.response.data);
    }
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
            <Link to='/mypage' className={subMenu["home-link"]}><span>/&nbsp;マイページ</span></Link>
          </span>
          <span className={subMenu["comic-title"]}>
          /&nbsp;{ comic_title }を編集中です
          </span>
        </div>
      </div>
      <div className={subMenu.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
          <div className={form["form-text"]}>
            <div className={form["form-label"]}><span className={form["react-icon"]}><FcReading /></span>漫画のタイトル</div>
            { errors.title &&
              <div className={form.errors}><span className={form["react-icon"]}><FcHighPriority /></span>漫画のタイトルが空欄です</div> 
            }
            <input
              className={form["form-input"]}
              defaultValue={ comics.title }
              placeholder={"漫画のタイトルを入力してください"}
              {...register('title', {
                required: true
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
              {...register('genre', {
                required: true
              })}
            >
              <option>{ comics.genre }</option>
              {comicNewGenreJson.map((genre, index) =>
                <option key={index}>{ genre.genre }</option>
              )}
            </select>
          </div>
          <div className={form["form-text"]}>
            <Link to={`/comic/${comic_id}/${comic_title}/comic_edit/comic-image-edit`} className={form['image-button']}><span className={form['react-icon']}><FcPicture /></span>画像を変更する</Link>
          </div>
          <div className={form["form-text"]}>
            <button className={form["form-submit"]} type="submit"><span className={form["react-icon"]}><FcFeedback /></span>この内容で登録する</button>
          </div>
          <div className={form["form-text-delete"]}>
            <Link to={`/comic/${comic_id}/${comic_title}/comic_confirm_delete`} className={form['delete-button']}><span className={form['delete-button-icon']}><BsFillTrashFill /></span>削除</Link>
          </div>
          <div className={form["form-text-back"]}>
            <button onClick={() => navigate('/mypage')} className={form.back}><span className={form["react-icon"]}><FcUpLeft /></span>マイページへ戻る</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComicEdit;
