import { createContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';

export const AuthContext = createContext();

export const AuthGuardProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false); //認証済みのユーザーがいるかどうかを判定するstate
  const [currentUser, setCurrentUser] = useState(); //認証したユーザーの情報を入れるstate

  //認証済みのユーザーがいるかどうかチェック
  //確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser(); //resに認証済みのユーザーを取得する関数を代入

      //以下はエルビス演算子というもので左の値がtrueの時は左の値を。falseなら右の値を返す。
      //https://qiita.com/att55/items/5bbbc29f7b7c730a3bd8
      if (res?.data === true) { //もしユーザーのデータがtrueの時(ある時)
        setIsSignedIn(true); //認証済みのユーザーをtrueにする
        setCurrentUser(res.data); //認証済みのユーザーを取得したデータをcurrentUserに入れている
        console.log(res.data); //上記のデータをconsoleに表示
      } else {
        console.log("ログインしていません"); //それ以外の時はログインしていませんを表示
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const Private = ({ children }) => {
    if (!loading) { //loadingがfalseならば認証済みのユーザーを
      if (isSignedIn) {
        return children;
      } else {
        return <Navigate replace to="/signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser, Private }}>
      { !loading && children }
    </AuthContext.Provider>
  )
}
