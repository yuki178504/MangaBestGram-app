import { Link } from "react-router-dom";
import complete from '../../../../css/model/mypage/ui/complete.module.css';
import { FcOk } from "react-icons/fc";

const ComicCompletion = () => {
  return (
    <div className={complete.wrapper}>
      <div className={complete.title}><span className={complete["react-icon"]}><FcOk /></span>投稿が完了しました！</div>
      <Link to='/mypage' className={complete.mypage}>マイページへ戻る</Link>
    </div>
  );
};

export default ComicCompletion;
