import { createContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, TermsOfService, PrivacyPolicy, SignIn, SignUp, Contact, MyPage } from './Pages';
import { getCurrentUser } from "../api/auth";
import ProfileEdit from '../components/ProfileEdit';

export const AuthContext = createContext();

const Routers = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

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

  const Private = ({ children }) => {
    if (!loading) {
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
    <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser, }}>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/terms-of-service' element={ <TermsOfService /> } />
        <Route path='/privacy-policy' element={ <PrivacyPolicy /> } />
        <Route path='/signin' element={ <SignIn /> } />
        <Route path='/signup' element={ <SignUp /> } />
        <Route path='/contact' element={ <Contact /> } />
        <Route path='/mypage' element={ <Private><MyPage /></Private> } />
        <Route path='/edit' element={ <Private><ProfileEdit /></Private> } />
      </Routes>
    </AuthContext.Provider>
  )
}

export default Routers;
