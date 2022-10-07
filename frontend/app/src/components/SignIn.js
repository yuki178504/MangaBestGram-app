import React from 'react';
import { Link } from 'react-router-dom';
import signin from '../css/signin.module.css'
import { FaUnlock, FaEnvelope } from "react-icons/fa";
import { IconContext } from 'react-icons' 

const SignIn = () => {
  return (
    <div className={signin['sign-in-up-main-section']}>
      <div className={signin['sign-in-up-main-content']}>
        <div className={signin['sign-in-up-inner-title']}>ログイン</div>
        <div className={signin['sign-in-up-outer-item']}>
          <div className={signin['sign-in-up-inner-login']}><Link to='/signin' className={signin['sign-in-up-inner-login-link']}>ログイン</Link></div>
          <div className={signin['sign-in-up-inner-register']}><Link to='/signup' className={signin['sign-in-up-inner-register-link']}>新規登録</Link></div>
        </div>
        <div className={signin['sign-in-up-outer-list']}>
          <div className={signin['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signin['sign-in-up-inner-icon']}><FaEnvelope /></div>
          </IconContext.Provider>
          <input  type="text" placeholder='メールアドレス' className={signin['sign-in-up-inner-list']} />
          </div>
          <div className={signin['sign-in-up-outer-icon']}>
          <IconContext.Provider value={{ size: '25px' }}>
            <div className={signin['sign-in-up-inner-icon']}><FaUnlock /></div>
          </IconContext.Provider>
          <input  type="text" placeholder='パスワード' className={signin['sign-in-up-inner-list']} />
          </div>
          <div className={signin['sign-in-up-out-outer-submit']}>
            <button className={signin['sign-in-up-out-inner-submit']}>ログイン</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn;
