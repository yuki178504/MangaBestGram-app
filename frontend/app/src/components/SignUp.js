import signup from '../css/signup.module.css';
import { Link } from 'react-router-dom';
import { FaUser, FaUnlock, FaEnvelope } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { useState } from "react";
import { signUp } from "../api/auth";

const SignUp = () => {
//それぞれのデータをuseStateで保持している
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordConfirmation, setPasswordConfirmation ] = useState("");
  const confirmSuccessUrl = process.env.REACT_APP_CONFIRM_SUCCESS_URL; //確認メール送信先からの推移先の記述

  const generateParams = () => {
    const signUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      confirmSuccessUrl: confirmSuccessUrl,
    };
    return signUpParams;
  };
//新規登録ボタンを押した時の処理
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams(); //generateParamsで定義したそれぞれのパラメータをparamsに代入
    try {
      const res = await signUp(params);
      console.log(res);
      alert("確認メールを送信しました！");
    } catch (e) {
      console.log(e)
      alert("正しく入力してください")
    }
  };

  return (
    <div className={signup['sign-in-up-main-section']}>
      <div className={signup['sign-in-up-main-content']}>
        <div className={signup['sign-in-up-inner-title']}>新規登録</div>
        <div className={signup['sign-in-up-outer-item']}>
          <div className={signup['sign-in-up-inner-login']}><Link to='/signin' className={signup['sign-in-up-inner-login-link']}>ログイン</Link></div>
          <div className={signup['sign-in-up-inner-register']}><Link to='/signup' className={signup['sign-in-up-inner-register-link']}>新規登録</Link></div>
        </div>
        <form className={signup['sign-in-up-outer-list']}>
        <div className={signup['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signup['sign-in-up-inner-icon']}><FaUser /></div>
          </IconContext.Provider>
          <input
            type='name'
            id='name'
            name='name'
            value={name}
            placeholder='ユーザー名'
            onChange={(e) => setName(e.target.value)}
            className={signup['sign-in-up-inner-list']}
            />
          </div>
          <div className={signup['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signup['sign-in-up-inner-icon']}><FaEnvelope /></div>
          </IconContext.Provider>
          <input
            type='enail'
            id='email'
            name='email'
            value={email}
            placeholder='メールアドレス'
            onChange={(e) => setEmail(e.target.value)}
            className={signup['sign-in-up-inner-list']}
            />
          </div>
          <div className={signup['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signup['sign-in-up-inner-icon']}><FaUnlock /></div>
          </IconContext.Provider>
          <input
            type="password"
            id='password'
            name='password'
            value={password}
            placeholder='パスワード'
            onChange={(e) => setPassword(e.target.value)}
            className={signup['sign-in-up-inner-list']}
            />
          </div>
          <div className={signup['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signup['sign-in-up-inner-icon']}><FaUnlock /></div>
          </IconContext.Provider>
          <input
            type="password"
            id='password_confirmation'
            name='password_confirmation'
            value={passwordConfirmation}
            placeholder='パスワード(確認)'
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className={signup['sign-in-up-inner-list']}
            />
          </div>
          <input
          type='hidden'
          id='confirm_success_url'
          name='confirm_success_url'
          value={confirmSuccessUrl}
          />
          <div className={signup['sign-in-up-out-outer-submit']}>
            <button type='submit' onClick={(e) => handleSignUpSubmit(e)} className={signup['sign-in-up-out-inner-submit']}>新規登録</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
