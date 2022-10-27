import { createContext, useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext();

export const AuthGuardProvider = ({children}) => {
  const { isAuthenticated,loginWithRedirect,logout,getAccessTokenSilently, user } = useAuth0();
  const [ token, setToken ] = useState('');

    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken)
      } catch (e) {
        console.log(e.message)
      }
    };

    useEffect(() => {
      getToken();
    }, []);
    
  return (
    <AuthContext.Provider value={{ isAuthenticated, loginWithRedirect, logout, token, user }}>
      { children }
    </AuthContext.Provider>
  );
};
