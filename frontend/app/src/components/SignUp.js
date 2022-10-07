import React from 'react';
import signup from '../css/signup.module.css'
import { Link } from 'react-router-dom';
import { FaUser, FaUnlock, FaEnvelope } from "react-icons/fa";
import { IconContext } from 'react-icons' 

const SignUp = () => {
  return (
    <div className={signup['sign-in-up-main-section']}>
      <div className={signup['sign-in-up-main-content']}>
        <div className={signup['sign-in-up-inner-title']}>新規登録</div>
        <div className={signup['sign-in-up-outer-item']}>
          <div className={signup['sign-in-up-inner-login']}><Link to='/signin' className={signup['sign-in-up-inner-login-link']}>ログイン</Link></div>
          <div className={signup['sign-in-up-inner-register']}><Link to='/signup' className={signup['sign-in-up-inner-register-link']}>新規登録</Link></div>
        </div>
        <div className={signup['sign-in-up-outer-list']}>
        <div className={signup['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signup['sign-in-up-inner-icon']}><FaUser /></div>
          </IconContext.Provider>
          <input  type="text" placeholder='ユーザー名' className={signup['sign-in-up-inner-list']} />
          </div>
          <div className={signup['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signup['sign-in-up-inner-icon']}><FaEnvelope /></div>
          </IconContext.Provider>
          <input  type="text" placeholder='メールアドレス' className={signup['sign-in-up-inner-list']} />
          </div>
          <div className={signup['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signup['sign-in-up-inner-icon']}><FaUnlock /></div>
          </IconContext.Provider>
          <input  type="text" placeholder='パスワード' className={signup['sign-in-up-inner-list']} />
          </div>
          <div className={signup['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signup['sign-in-up-inner-icon']}><FaUnlock /></div>
          </IconContext.Provider>
          <input  type="text" placeholder='パスワード(確認)' className={signup['sign-in-up-inner-list']} />
          </div>
          <div className={signup['sign-in-up-out-outer-submit']}>
            <button className={signup['sign-in-up-out-inner-submit']}>新規登録</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
