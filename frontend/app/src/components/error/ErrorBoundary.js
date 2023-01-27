import { useNavigate } from "react-router-dom";
import error from '../../css/error/page404AndErrorBoundary.module.css';
import { BsFillReplyFill } from "react-icons/bs";

const ErrorFallback = () => {
  const navigate = useNavigate();

  const redirect =() => {
    navigate('/')
    window.location.reload()
  }

  // setTimeout(() => {
  //   window.location.href = '/';
  // }, 5000)

  return (
    <div className={error['wrapper-boundary']}>
      <div>エラーが発生しました！</div>
      <div className={error.detail}>下記のボタンを押すか、5秒後にホーム画面に推移します</div>
      <button className={error.back} onClick={() => redirect()}><span className={error["bs-fill-replay-fill"]}><BsFillReplyFill /></span>ホーム画面に戻る</button>
    </div>
  );
};

export default ErrorFallback;
