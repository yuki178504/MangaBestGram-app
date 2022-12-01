import { Link } from 'react-router-dom';
import error from '../../css/error/page404AndErrorBoundary.module.css';
import { BsFillReplyFill } from "react-icons/bs";

const Page404 = () => {
  return (
    <div className={error.wrapper}>
      <h1>404 NOT FOUND</h1>
      <p className={error.detail}>お探しのページが見つかりませんでした</p>
      <Link className={error.back} to='/'><span className={error["bs-fill-replay-fill"]}><BsFillReplyFill /></span>ホーム画面に戻る</Link>
    </div>
  );
};

export default Page404;
