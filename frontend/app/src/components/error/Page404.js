import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div>
      <h1>404 NOT FOUND</h1>
      <p>お探しのページが見つかりませんでした</p>
      <Link to='/'>ホーム画面に戻る</Link>
    </div>
  );
};

export default Page404;
