import React, { useContext,useEffect } from "react";
import { AuthContext } from "../route/Routers";
import { getCurrentUser } from "../api/auth";

const MyPage = () => {
  const { setIsSignedIn, setLoading, currentUser, setCurrentUser } = useContext(AuthContext);

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("ログインしていません");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  return (
    <div>
      <div>メールアドレス { currentUser.email }</div>
      <div>ユーザー名 { currentUser.name }</div>

    </div>
  )
}

export default MyPage;
