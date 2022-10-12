import { useContext, useState } from 'react';
import Cookies from "js-cookie";
import { signIn } from "../api/auth";
import { Link, useNavigate } from 'react-router-dom';
import signin from '../css/signin.module.css'
import { FaUnlock, FaEnvelope } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { AuthLoginContext } from "../providers/AuthLogin";

const SignIn = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthLoginContext);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const navigate = useNavigate();

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password
    };
    return signInParams;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
      alert("正しく入力してください")
    }
  };

  return (
    <div className={signin['sign-in-up-main-section']}>
      <div className={signin['sign-in-up-main-content']}>
        <div className={signin['sign-in-up-inner-title']}>ログイン</div>
        <div className={signin['sign-in-up-outer-item']}>
          <div className={signin['sign-in-up-inner-login']}><Link to='/signin' className={signin['sign-in-up-inner-login-link']}>ログイン</Link></div>
          <div className={signin['sign-in-up-inner-register']}><Link to='/signup' className={signin['sign-in-up-inner-register-link']}>新規登録</Link></div>
        </div>
        <form className={signin['sign-in-up-outer-list']}>
          <div className={signin['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signin['sign-in-up-inner-icon']}><FaEnvelope /></div>
          </IconContext.Provider>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            placeholder='メールアドレス'
            onChange={(e) => setEmail(e.target.value)}
            className={signin['sign-in-up-inner-list']}
          />
          </div>
          <div className={signin['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signin['sign-in-up-inner-icon']}><FaUnlock /></div>
          </IconContext.Provider>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            placeholder='パスワード'
            onChange={(e) => setPassword(e.target.value)}
            className={signin['sign-in-up-inner-list']}
          />
          </div>
          <div className={signin['sign-in-up-out-outer-submit']}>
            <button type='submit' onClick={(e) => handleSignInSubmit(e)} className={signin['sign-in-up-out-inner-submit']}>ログイン</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn;
