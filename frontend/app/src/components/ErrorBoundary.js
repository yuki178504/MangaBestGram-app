import { useNavigate } from "react-router-dom";

const ErrorFallback = () => {
  const navigate = useNavigate();

  const redirect =() => {
    navigate('/')
    window.location.reload()
  }

  setTimeout(() => {
    window.location.href = '/';
  }, 5000)

  const detail = { marginBottom: '20px' }

  const back = {
    border: '2px solid #a9a9a9',
    borderRadius: '5px',
    boxShadow: '2.7px 3.2px 2px 0.3px #a9a9a9',
    fontSize: '15px',
    fontWeight: 'bold',
    padding: '18px 8px',
    backgroundColor: '#a9a9a9',
    color: 'white',
  }

  return (
    <div
      style={{
        padding: '100px'
      }}
    >
      <div style={{
        textAlign: 'center',
        fontSize: '30px'
      }}
      >
        <div style={detail}>エラーが発生しました！</div>
        <div style={detail}>下記のボタンを押すか、5秒後にホーム画面に推移します</div>
        <button style={back} onClick={() => redirect()}>ホーム画面に戻る</button>
      </div>
    </div>
  );
};

export default ErrorFallback;
